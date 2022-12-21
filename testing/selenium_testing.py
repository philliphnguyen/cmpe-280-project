
# First, import the necessary modules
import time
import string
import random
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

# Next, create a webdriver instance and navigate to the login page
# driver_path = "C:\\Users\\akaid\Downloads\\chromedriver_win32\\chromedriver.exe"
# options = Options()
# options.binary_location = driver_path
# options.add_argument("--start-maximized")  # open Browser in maximized mode
# options.add_argument("--no-sandbox")  # bypass OS security model
# # overcome limited resource problems
# options.add_argument("--disable-dev-shm-usage")
# options.add_experimental_option("excludeSwitches", ["enable-automation"])
# options.add_experimental_option('useAutomationExtension', False)
# # driver = webdriver.Chrome(options=options, executable_path=driver_path)
driver = webdriver.Chrome(
    r"C:\Users\akaid\Downloads\chromedriver_win32\chromedriver.exe")

print('successfully started')


# Test 1: Login with invalid credentials --------------
driver.get("http://localhost:63342/cmpe-280-project/frontend/login.html")
print('successfully loaded')
# Locate the username and password input fields
username_field = driver.find_element_by_id("loginEmail")
password_field = driver.find_element_by_id("loginPassword")

# Enter the login credentials
username_field.send_keys("sdfasdf")
password_field.send_keys("sdfasdf")

# Submit the form by either clicking the login button or pressing Enter
login_button = driver.find_element_by_id("submitButton")
login_button.click()
password_field.send_keys(Keys.RETURN)

time.sleep(2)

try:
    alert = driver.switch_to_alert()
    print(alert.text)
    alert.accept()
except:
    print("No alert found")


# Test 2: Login with valid credentials --------------
driver.get("http://localhost:63342/cmpe-280-project/frontend/login.html")
print('successfully loaded')
# Locate the username and password input fields
username_field = driver.find_element_by_id("loginEmail")
password_field = driver.find_element_by_id("loginPassword")

# Enter the login credentials
username_field.send_keys("a@email.com")
password_field.send_keys("pwd")

# Submit the form by either clicking the login button or pressing Enter
login_button = driver.find_element_by_id("submitButton")
login_button.click()
password_field.send_keys(Keys.RETURN)

# Verify that the login was successful by checking for a specific element on the page
time.sleep(2)
print(driver.current_url)
assert "home.html" in driver.current_url

# Test 3: Logout -------------------------------------
# find logout button in navbar and click it
logout_button = driver.find_element_by_css_selector("a[href='index.html']")
logout_button.click()

# Verify that the logout was successful by checking for a specific element on the page
# get page url
time.sleep(2)
print(driver.current_url)
assert "home.html" in driver.current_url

# Test 4: Signup -------------------------------------
driver.get("http://localhost:63342/cmpe-280-project/frontend/signup.html")
print('successfully loaded')

# Locate the username and password input fields
username_field = driver.find_element_by_id("registerName")
email_field = driver.find_element_by_id("registerEmail")
password_field = driver.find_element_by_id("registerPassword")

# Enter the login credentials
name = ''.join(random.choices(string.ascii_lowercase, k=7))
username_field.send_keys(name)
email_field.send_keys(f"{name}@email.com")
password_field.send_keys("password")

# Submit the form by either clicking the login button or pressing Enter
submit_button = driver.find_element_by_id("submitButton")
submit_button.click()
password_field.send_keys(Keys.RETURN)

time.sleep(2)
print(driver.current_url)
assert "home.html" in driver.current_url


driver.get("http://localhost:63342/cmpe-280-project/frontend/home.html")
print('successfully loaded')

# Test 5: Filter Prime Movies --------------------------
prime_button = driver.find_element_by_css_selector(
    "body > div:nth-child(2) > div.mt-4.flex.relative.items-center.w-full.justify-center.gap-32 > button:nth-child(1)")
prime_button.click()
time.sleep(2)

# Test 6: Filter Netflix Movies -----------------------------
netflix_button = driver.find_element_by_css_selector(
    "body > div:nth-child(2) > div.mt-4.flex.relative.items-center.w-full.justify-center.gap-32 > button:nth-child(2)")
netflix_button.click()
time.sleep(2)

# Test 7: Filter Hulu Movies -----------------------------
hulu_button = driver.find_element_by_css_selector(
    "body > div:nth-child(2) > div.mt-4.flex.relative.items-center.w-full.justify-center.gap-32 > button:nth-child(3)")
hulu_button.click()
time.sleep(2)

# Test 8: Filter Disney+ Movies -----------------------------
disney_button = driver.find_element_by_css_selector(
    "body > div:nth-child(2) > div.mt-4.flex.relative.items-center.w-full.justify-center.gap-32 > button:nth-child(4)")
disney_button.click()
time.sleep(2)


# Close the browser
driver.close()
