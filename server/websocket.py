from flask import Flask, render_template
from flask_socketio import SocketIO, emit
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True
socketio = SocketIO(app)


@socketio.on('edit')
def edit(json):
    print('received json: ' + str(json))
    emit('edit', json, json=True, broadcast=True)


@socketio.on('new')
def new(id):
    print(id)
    emit('new', id, json=True, broadcast=True)

@socketio.on('changeTitle')
def changeTitle(title):
    print('New title: ', title)
    emit('changeTitle', title, broadcast=True)

if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0')
