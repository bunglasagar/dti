from ollama import generate
from PIL import Image
from io import BytesIO
import cv2

# def test():
#     cap = cv2.VideoCapture(0)
#     if not cap.isOpened():
#         print("Error: Could not open webcam.")
#         exit()
#
#     ret, frame = cap.read()
#     if ret:
#         cv2.imshow('Captured Frame', frame)
#         cv2.waitKey(0)
#         cv2.destroyAllWindows()
#         return frame  # Return the captured frame
#     else:
#         print("Error: Could not read frame from webcam.")
#         cap.release()
#         cv2.destroyAllWindows()
#         return None


def process_image(image_file):
    print(f"\nProcessing {image_file}\n")
    with Image.open(image_file) as img:
        with BytesIO() as buffer:
            img.save(buffer, format='PNG')
            image_bytes = buffer.getvalue()

    full_response = ''
    for response in generate(model='llava',
                             prompt='check if the leaf contains some disease or not, if yes then describe the disease and how can we cure it. Mention only key points andmake it short and informative',
                             # prompt = 'Describe about the image ',
                             images=[image_bytes],
                             stream=True):
        # Print the response to the console and add it to the full response
        print(response['response'], end='', flush=True)


process_image('..//plants.jpg')

# def main():
#     img = test()
#     if img is not None:
#         process_image(img)