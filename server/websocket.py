from flask import Flask, render_template
from flask_socketio import SocketIO, emit,join_room, leave_room
import datetime

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.debug = True
socketio = SocketIO(app)

@socketio.on('join')
def join(id):
    join_room(id)
    print('One join ', id)

@socketio.on('edit')
def edit(paragraph):
    print('received json: ' + str(paragraph))
    emit('edit', paragraph, json=True, room = paragraph['id'])

@socketio.on('save')
def save(data):
    print(data[0],' new version:',data[1])
    emit('save',data, room = data[0])

@socketio.on('new')
def new(id):
    print(id)
    emit('new', id, json=True, room = id[3])

@socketio.on('changeTitle')
def changeTitle(data):
    print(data[0], ' new title: ', data[1])
    emit('changeTitle', data[1], room = data[0])

if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0')
