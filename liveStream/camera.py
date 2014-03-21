import cv2.cv as cv
from tornado.websocket import WebSocketHandler
import tornado.web
import tornado.httpserver
from tornado.ioloop import IOLoop

class WSHandler(WebSocketHandler):
    def initialize(self, camera):
        self.camera = camera

    def open(self):
        print("connection opened")
        while True:
            self.loop()

    def loop(self):
        img = self.camera.takeImage()
        self.write_message(img, binary=True)

class Camera():
    def __init__(self):
        self.capture = cv.CaptureFromCAM(0)
        cv.SetCaptureProperty(self.capture, cv.CV_CAP_PROP_FRAME_WIDTH, 480)
        cv.SetCaptureProperty(self.capture, cv.CV_CAP_PROP_FRAME_HEIGHT, 360)
    
    def takeImage(self):
        img = cv.QueryFrame(self.capture)
        img = cv.EncodeImage(".jpg", img).tostring()
        return img

def main():
    camera = Camera()
    app = tornado.web.Application([
        (r"/camera", WSHandler, dict(camera=camera)),
    ])
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(8080)
    IOLoop.instance().start()

if __name__ == "__main__":
    main()
