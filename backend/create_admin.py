from app import create_app, db
from app.models import User

app = create_app()

with app.app_context():
    username = 'Admin'
    password = 'Admin'

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        print("Usuário já existe.")
    else:
        admin = User(username=username, is_admin=True)
        admin.set_password(password)
        db.session.add(admin)
        db.session.commit()
        print("Usuário admin criado com sucesso.")