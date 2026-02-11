import asyncio
import sys
from pathlib import Path

# Add the src directory to the Python path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from sqlalchemy.ext.asyncio import AsyncSession
from app.core.db import db_manager
from app.models.country import CountryProfile, DangerLevel
from app.models.user import User, EditorProfile, UserRole
from app.core.security import get_password_hash


async def add_sample_countries():
  """Add 10 sample countries to the database."""
  
  # Sample country data
  countries_data = [
    {
      "name": "Poland",
      "country_code": "PL",
      "description": "Poland is a Central European country known for its rich history, medieval architecture, and vibrant culture. Major cities include Warsaw, Krakow, and Gdansk.",
      "danger_level": DangerLevel.LOW.value
    },
    {
      "name": "Germany",
      "country_code": "DE",
      "description": "Germany is a Western European country known for its engineering excellence, cultural heritage, and economic strength. Home to Berlin, Munich, and Hamburg.",
      "danger_level": DangerLevel.LOW.value
    },
    {
      "name": "France",
      "country_code": "FR",
      "description": "France is renowned for its art, cuisine, fashion, and iconic landmarks like the Eiffel Tower. Paris is the capital and largest city.",
      "danger_level": DangerLevel.LOW.value
    },
    {
      "name": "Spain",
      "country_code": "ES",
      "description": "Spain offers diverse culture, beautiful beaches, historic cities, and world-famous cuisine. Major cities include Madrid, Barcelona, and Seville.",
      "danger_level": DangerLevel.LOW.value
    },
    {
      "name": "Italy",
      "country_code": "IT",
      "description": "Italy is famous for its ancient history, Renaissance art, stunning architecture, and exceptional cuisine. Home to Rome, Venice, and Florence.",
      "danger_level": DangerLevel.LOW.value
    },
    {
      "name": "United Kingdom",
      "country_code": "GB",
      "description": "The UK comprises England, Scotland, Wales, and Northern Ireland. Known for its royal heritage, historic landmarks, and cultural influence.",
      "danger_level": DangerLevel.LOW.value
    },
    {
      "name": "Egypt",
      "country_code": "EG",
      "description": "Egypt is home to ancient pyramids, the Sphinx, and the Nile River. A country with thousands of years of civilization and rich archaeological sites.",
      "danger_level": DangerLevel.MODERATE.value
    },
    {
      "name": "Turkey",
      "country_code": "TR",
      "description": "Turkey bridges Europe and Asia, offering a unique blend of cultures, historic sites like Hagia Sophia, and beautiful coastal areas.",
      "danger_level": DangerLevel.MODERATE.value
    },
    {
      "name": "Ukraine",
      "country_code": "UA",
      "description": "Ukraine is the largest country entirely in Europe, known for its diverse landscapes, historic cities, and rich cultural traditions.",
      "danger_level": DangerLevel.HIGH.value
    },
    {
      "name": "Syria",
      "country_code": "SY",
      "description": "Syria has a rich ancient history and was once home to some of the world's oldest civilizations. Currently experiencing significant security challenges.",
      "danger_level": DangerLevel.SEVERE.value
    }
  ]
  
  # Initialize database
  await db_manager.initialize()
  
  try:
    async with db_manager.get_session() as session:
      # Check if countries already exist
      from sqlalchemy import select
      result = await session.execute(select(CountryProfile))
      existing_countries = result.scalars().all()
      
      if existing_countries:
        print(f"Database already contains {len(existing_countries)} countries.")
        print("Existing countries:")
        for country in existing_countries:
          print(f"  - {country.name} ({country.country_code}) - {country.danger_level}")
        
        response = input("\nDo you want to add more countries anyway? (y/n): ")
        if response.lower() != 'y':
          print("Operation cancelled.")
          return
      
      # Add countries
      added_count = 0
      for country_data in countries_data:
        # Check if country already exists by code
        result = await session.execute(
          select(CountryProfile).where(CountryProfile.country_code == country_data["country_code"])
        )
        existing = result.scalar_one_or_none()
        
        if existing:
          print(f"Country {country_data['name']} ({country_data['country_code']}) already exists. Skipping.")
          continue
        
        # Create new country
        country = CountryProfile(
          name=country_data["name"],
          country_code=country_data["country_code"],
          description=country_data["description"],
          danger_level=country_data["danger_level"]
        )
        session.add(country)
        added_count += 1
        print(f"✓ Added: {country_data['name']} ({country_data['country_code']}) - Danger Level: {country_data['danger_level']}")
      
      # Commit all changes
      await session.commit()
      
      print(f"\n{'='*60}")
      print(f"Successfully added {added_count} countries to the database!")
      print(f"{'='*60}")
      
      # Display all countries
      result = await session.execute(select(CountryProfile))
      all_countries = result.scalars().all()
      print(f"\nTotal countries in database: {len(all_countries)}")
      
      # Create an EditorProfile account
      print(f"\n{'='*60}")
      print("Creating Editor account...")
      print(f"{'='*60}")
      
      # Check if editor already exists
      editor_email = "editor@odyseusz.com"
      result = await session.execute(
        select(User).where(User.email == editor_email)
      )
      existing_editor = result.scalar_one_or_none()
      
      if existing_editor:
        print(f"Editor account with email {editor_email} already exists.")
        editor_user = existing_editor
      else:
        # Create editor user
        editor_user = User(
          email=editor_email,
          password_hash=get_password_hash("editor123"),
          first_name="John",
          last_name="Editor",
          role=UserRole.EDITOR.value,
          is_active=True
        )
        session.add(editor_user)
        await session.flush()  # Flush to get the user ID
        
        # Create editor profile
        editor_profile = EditorProfile(
          user_id=editor_user.id
        )
        session.add(editor_profile)
        await session.flush()  # Flush to get the profile ID
        
        print(f"✓ Created editor user: {editor_email}")
        print(f"  Password: editor123")
        print(f"  Name: {editor_user.first_name} {editor_user.last_name}")
      
      # Get the editor profile with eager loading of country_profiles
      from sqlalchemy.orm import selectinload
      result = await session.execute(
        select(EditorProfile)
        .where(EditorProfile.user_id == editor_user.id)
        .options(selectinload(EditorProfile.country_profiles))
      )
      editor_profile = result.scalar_one()
      
      # Select 3 countries to assign to the editor (Poland, Germany, France)
      countries_to_assign = ["PL", "DE", "FR"]
      assigned_countries = []
      
      # Get existing country codes already assigned to editor
      existing_country_codes = {country.country_code for country in editor_profile.country_profiles}
      
      for country_code in countries_to_assign:
        result = await session.execute(
          select(CountryProfile).where(CountryProfile.country_code == country_code)
        )
        country = result.scalar_one_or_none()
        
        if country:
          # Check if already assigned
          if country_code not in existing_country_codes:
            editor_profile.country_profiles.append(country)
            assigned_countries.append(country)
            print(f"✓ Assigned country: {country.name} ({country.country_code})")
          else:
            print(f"  Country {country.name} ({country.country_code}) already assigned to editor")
      
      # Commit the editor and country assignments
      await session.commit()
      
      print(f"\n{'='*60}")
      print(f"Editor account setup complete!")
      print(f"Email: {editor_email}")
      print(f"Password: editor123")
      print(f"Assigned countries: {len(assigned_countries)}")
      print(f"{'='*60}")
      
  except Exception as e:
    print(f"Error: {e}")
    raise
  finally:
    await db_manager.close()


if __name__ == "__main__":
  print("Adding sample countries to the database...\n")
  asyncio.run(add_sample_countries())
