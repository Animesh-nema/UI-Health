import os
from flask import Flask
from flask_cors import CORS
from model import db
from flask_migrate import Migrate

basedir = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:@localhost/UI-Health'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)

migrate = Migrate(app, db)

db.init_app(app)
if __name__ == '__main__':
    app.run(debug=True)
