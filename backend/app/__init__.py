from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS



db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Permite requisições apenas do front-end (http://localhost:3000)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    db.init_app(app)
    migrate.init_app(app, db)

    # Importa as rotas depois que o app foi criado
    # Importa o blueprint 'rotablue'
    from app.routes import rotablue
    app.register_blueprint(rotablue, url_prefix='/api')  # Registra o blueprint com prefixo '/api'

    return app