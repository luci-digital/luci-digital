from lucia_ai.modules.nlp_module import process_text
from lucia_ai.modules.vision_module import analyze_image

def main():
    print("Lucia AI is starting...")
    # Example usage of AI components
    text = "Hello, Lucia!"
    response = process_text(text)
    print(f"NLP Response: {response}")

    # Example image analysis
    image_path = "path_to_image.jpg"
    result = analyze_image(image_path)
    print(f"Vision Module Analysis: {result}")

if __name__ == "__main__":
    main()
