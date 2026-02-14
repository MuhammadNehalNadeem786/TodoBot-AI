from sqlmodel import create_engine, SQLModel

# Export Base for SQLAlchemy models
Base = SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from typing import AsyncGenerator
from src.config import settings

# Neon PostgreSQL: async uses asyncpg, sync uses psycopg2 (per specs/1-backend-todo)
_db_url = str(settings.DATABASE_URL)
async_engine = create_async_engine(_db_url)
# Sync engine for Alembic and sync table creation (postgresql+psycopg2)
sync_url = _db_url.replace("postgresql+asyncpg", "postgresql+psycopg2", 1)
sync_engine = create_engine(sync_url)

# Synchronous SessionLocal for sync DB operations
from sqlalchemy.orm import sessionmaker as sync_sessionmaker
SessionLocal = sync_sessionmaker(autocommit=False, autoflush=False, bind=sync_engine)

AsyncSessionLocal = sessionmaker(
    bind=async_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session

def init_db(): # Renamed to match your CLI command
    """Create database tables synchronously"""
    from src.models.task import Task
    from src.models.conversation import Conversation
    from src.models.message import Message
    SQLModel.metadata.create_all(sync_engine)

async def create_db_and_tables_async():
    """Create database tables asynchronously"""
    from src.models.task import Task
    from src.models.conversation import Conversation
    from src.models.message import Message
    async with async_engine.begin() as conn:
        # Corrected: run_sync passes the 'conn' automatically
        await conn.run_sync(SQLModel.metadata.create_all)