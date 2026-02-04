import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from app.core.db import db_manager
from app.services.country_updater import update_country_danger_levels

logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


async def scheduled_country_update():
	"""Scheduled job to update country danger levels."""
	logger.info("Starting scheduled country danger level update")
	try:
		async with db_manager.get_session() as db:
			stats = await update_country_danger_levels(db)
			logger.info(f"Scheduled update completed: {stats}")
	except Exception as e:
		logger.error(f"Error in scheduled country update: {e}", exc_info=True)


def start_scheduler():
	"""Start the scheduler with the country update job."""
	# Schedule job to run daily at 6:00 AM
	scheduler.add_job(
		scheduled_country_update,
		trigger=CronTrigger(hour=6, minute=0),
		id="update_country_danger_levels",
		name="Update country danger levels from external API",
		replace_existing=True
	)
	
	scheduler.start()
	logger.info("Scheduler started. Country danger level update scheduled daily")


def shutdown_scheduler():
	"""Shutdown the scheduler."""
	scheduler.shutdown()
	logger.info("Scheduler shut down")
