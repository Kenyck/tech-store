import os

class Config:
    SECRET_KEY = 'minha_chave_secreta'
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:96521478@localhost/tech_store'
    SQLALCHEMY_TRACK_MODIFICATIONS = False