"""change annotation structure

Revision ID: 878e8193ae4d
Revises: 37a7d932fc02
Create Date: 2019-03-26 12:53:27.069030

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '878e8193ae4d'
down_revision = '37a7d932fc02'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("annotation") as batch_op:
        batch_op.drop_column('time_start')
        batch_op.drop_column('time_end')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('annotation', sa.Column('time_end', sa.INTEGER(), nullable=True))
    op.add_column('annotation', sa.Column('time_start', sa.INTEGER(), nullable=True))
    # ### end Alembic commands ###