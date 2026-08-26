import os
import cv2
import numpy as np
from PIL import Image

def analyze_visual_change(before_path, after_path):
    """
    Performs change detection between before and after images.
    Returns:
        - change_score: float (0 to 100, where 100 is high visual change, 0 is no change)
        - status: str description
    """
    # Verify file paths
    if not os.path.exists(before_path) or not os.path.exists(after_path):
        return 0.0, "Files not found. Ground verification required."

    try:
        # Load images via OpenCV
        img_before = cv2.imread(before_path)
        img_after = cv2.imread(after_path)
        
        if img_before is None or img_after is None:
            # Fallback to PIL
            return analyze_visual_change_pil(before_path, after_path)
            
        # Resize to same dimensions for comparison
        h, w = 400, 400
        img_before = cv2.resize(img_before, (w, h))
        img_after = cv2.resize(img_after, (w, h))
        
        # Convert to Grayscale
        gray_before = cv2.cvtColor(img_before, cv2.COLOR_BGR2GRAY)
        gray_after = cv2.cvtColor(img_after, cv2.COLOR_BGR2GRAY)
        
        # Apply Gaussian Blur to reduce noise
        gray_before = cv2.GaussianBlur(gray_before, (5, 5), 0)
        gray_after = cv2.GaussianBlur(gray_after, (5, 5), 0)
        
        # Compute Absolute Difference
        diff = cv2.absdiff(gray_before, gray_after)
        
        # Threshold to get binary difference mask
        _, thresh = cv2.threshold(diff, 30, 255, cv2.THRESH_BINARY)
        
        # Calculate percentage of non-zero pixels (pixels changed)
        non_zeros = np.count_nonzero(thresh)
        total_pixels = w * h
        change_ratio = non_zeros / total_pixels
        
        # Map change ratio to a 0-100 score
        # Even a 15-20% pixel change represents massive building developments in aerial views
        change_score = min(100.0, change_ratio * 400.0) # multiplier to scale it
        
        # Format return details
        change_score = round(change_score, 1)
        
        if change_score > 60:
            status = "Significant visual change detected"
        elif change_score > 30:
            status = "Moderate visual change detected"
        else:
            status = "Low visual change — verification required"
            
        return change_score, status

    except Exception as e:
        print(f"OpenCV change detection failed: {e}. Attempting Pillow fallback.")
        return analyze_visual_change_pil(before_path, after_path)

def analyze_visual_change_pil(before_path, after_path):
    try:
        img_before = Image.open(before_path).convert('L').resize((400, 400))
        img_after = Image.open(after_path).convert('L').resize((400, 400))
        
        arr_before = np.array(img_before, dtype=np.int32)
        arr_after = np.array(img_after, dtype=np.int32)
        
        # Absolute difference
        diff = np.abs(arr_before - arr_after)
        
        # Threshold pixels with difference > 30
        changed_pixels = np.sum(diff > 30)
        total_pixels = 400 * 400
        change_ratio = changed_pixels / total_pixels
        
        change_score = round(min(100.0, change_ratio * 400.0), 1)
        
        if change_score > 60:
            status = "Significant visual change detected"
        elif change_score > 30:
            status = "Moderate visual change detected"
        else:
            status = "Low visual change — verification required"
            
        return change_score, status
    except Exception as e:
        print(f"Pillow change detection fallback failed: {e}")
        return 0.0, "Visual analysis failed. Manual review required."
