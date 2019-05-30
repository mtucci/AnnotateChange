"""Add cp_index column

Revision ID: 386d5c61a29b
Revises: e58a3596b899
Create Date: 2019-04-01 15:09:10.901684

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "386d5c61a29b"
down_revision = "e58a3596b899"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column(
        "annotation", sa.Column("cp_index", sa.INTEGER(), nullable=True)
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("annotation", "cp_index")
    # ### end Alembic commands ###
