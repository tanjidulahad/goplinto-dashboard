import React from 'react'
import './styles.css'
import Youtube from './Youtube'
export const CreateAccountContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>How to Create an Account</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: '550' }}>Creating an account is the first step.</p>

      <p style={{ fontWeight: '500' }}>
        If you are an existing user, go ahead and log in via Facebook, Google or Phone number, by whichever mode you
        have created an account.
      </p>

      <br />
      <p style={{ fontWeight: '500' }}>If you're a new user, go ahead and follow these below steps:</p>
      <ul style={{ marginLeft: '15px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Click on create account.</li>
        <li style={{ paddingLeft: '1em' }}>You can create an acccount using:</li>
        <ul style={{ marginLeft: '30px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Google or</li>
          <li style={{ paddingLeft: '1em' }}>Facebook or</li>
          <li style={{ paddingLeft: '1em' }}>Your phone number.</li>
        </ul>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Google Sign-Up</p>
      <ul style={{ marginLeft: '15px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Click on the “Log in with Google” Button.</li>
        <li style={{ paddingLeft: '1em' }}>Choose the Google account you want to sign-up with and confirm.</li>
        <li style={{ paddingLeft: '1em' }}>You have successfully created an account!</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Facebook Sign-Up</p>
      <ul style={{ marginLeft: '15px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Click on the “Log in with Facebook” Button.</li>
        <li style={{ paddingLeft: '1em' }}>Log in to your Facebook account you want to sign-up with and confirm.</li>
        <li style={{ paddingLeft: '1em' }}>You have successfully created an account!</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Phone number Sign-Up</p>
      <ul style={{ marginLeft: '15px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Type in the name and the phone number.</li>
        <li style={{ paddingLeft: '1em' }}>Wait for the OTP verification message.</li>
        <li style={{ paddingLeft: '1em' }}>Type in the OTP which you have received on your phone.</li>
        <li style={{ paddingLeft: '1em' }}>You have successfully created an account!</li>
      </ul>
      <br />
    </div>
    <p style={{ fontWeight: 450, fontSize: '25px' }}>Welcome to GoPlinto!</p>
  </div>
)

export const CreateStoreContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Create Store</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 550 }}>Now it's time to create a store.</p>
      <br />
      <p style={{ fontWeight: 500 }}>To do that, You need to do the following things</p>{' '}
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Add Store details</li>
        <li style={{ paddingLeft: '1em' }}>Add Contact details</li>
        <li style={{ paddingLeft: '1em' }}>Choose a plan of our choice</li>{' '}
      </ul>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/bXjeABR7CK8" />
      </div>
      <br />
      <p style={{ fontWeight: 500 }}>Let's get started.</p>{' '}
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Click on the “Create Store” button in the dashboard.</li>{' '}
        <li style={{ paddingLeft: '1em' }}>
          In the first form, Add your <span style={{ fontWeight: 'bold' }}> store name,</span> choose your store type
          and a little <span style={{ fontWeight: 'bold' }}>description</span> defining your store.{' '}
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Once you have added all those details, click on the “next” button to proceed.
        </li>{' '}
        <li style={{ alignContent: 'center', paddingLeft: '1em' }}>
          A form asking for your store's <span style={{ fontWeight: 'bold' }}>contact information</span> will get
          displayed, where you can add the{' '}
          <span style={{ fontWeight: 'bold' }}>Contact number, Email Id, and WhatsApp number</span>{' '}
        </li>{' '}
        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>Please remember that these are details you are
          entering here, they will be displayed on your website, helping your customers reach out to you.{' '}
        </div>
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>The WhatsApp number is used for two purposes{' '}
          <ul style={{ marginLeft: '20px' }} className="list-disc">
            {' '}
            <li style={{ paddingLeft: '1em' }}>
              It will enable a WhatsApp chat on your website, enabling your customer to reach you out via message.{' '}
            </li>
            <li style={{ paddingLeft: '1em' }}>
              We will send notifications to this given number in case there is a new order on your website.
            </li>{' '}
          </ul>{' '}
        </div>
        <br />
        <li style={{ paddingLeft: '1em' }}>
          You can also add your Physical store address if you have one, by toggling the “My business has a physical
          address” ON{' '}
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Once you have added all those details, click on the “next” button to proceed.
        </li>{' '}
        <li style={{ paddingLeft: '1em' }}>
          Finally, choose a billing plan for your requirement or go ahead with the 30 days free trial by clicking on
          skip.{' '}
        </li>{' '}
      </ul>
      <br />{' '}
      <p style={{ fontWeight: 600 }}>
        That’s all, you have successfully created your store. Click on the link displayed there, to check out your
        store.
      </p>
    </div>
  </div>
)

export const DashboardIntroContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Intro to Dashboard</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500, fontSize: '16px' }}>
        Goplinto Dashboard has many interesting and useful features. Here is a list of all of them for quick access.
      </p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '0.5px' }}>Dashboard homepage</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1.5em' }}>
            This is you can find the store on/off toggle to turn off the store temporarily when needed. You can find
            this in the top-right corner
          </li>
          <li style={{ paddingLeft: '1.5em' }}>There is a store link on top next to the on/off toggle</li>
          <li style={{ paddingLeft: '1.5em' }}>
            In case you want to share the link via social media, the options are available.
          </li>
          <li style={{ paddingLeft: '1.5em' }}>
            You can also find the report’s overview, along with the modules pending to be filled based on the plan you
            choose, on this page.
          </li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>Store Settings</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Store Details</li>
          <li style={{ paddingLeft: '1em' }}>Contact Info</li>
          <li style={{ paddingLeft: '1em' }}>Bank Details</li>
          <li style={{ paddingLeft: '1em' }}>Website theme</li>
          <li style={{ paddingLeft: '1em' }}>Mobile App Theme</li>
          <li style={{ paddingLeft: '1em' }}>Payment Configuration</li>
          <li style={{ paddingLeft: '1em' }}>Store Tax</li>
          <li style={{ paddingLeft: '1em' }}>SEO Settings</li>
          <li style={{ paddingLeft: '1em' }}>Social Accounts</li>
          <li style={{ paddingLeft: '1em' }}>Social Policies</li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>
          Inventory
          <ul style={{ marginLeft: '20px' }} className="list-disc">
            <li>This is where you can add and manage your products</li>
          </ul>
        </li>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>Your orders</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>
            This is the page where you can view and process the orders, which have been placed by your customers
          </li>
          <li style={{ paddingLeft: '1em' }}>You can also find your past orders and generate the orders report here</li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>Reports & Analytics</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>In this module, you can find the basic sales report</li>
          <li style={{ paddingLeft: '1em' }}>
            Along with that, you can also generate and download the customer base details such as phone number and name
            belonging to each segmentation mentioned
          </li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>Marketing & Branding</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Push Notifications</li>
          <li style={{ paddingLeft: '1em' }}>Branding</li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>Integrations</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Google Analytics</li>
          <li style={{ paddingLeft: '1em' }}>Google Merchant center</li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>View Live Store & Share</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>
            By clicking on “View Live Store” will open up your store’s website in the next tab.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            In case you want to share the link via social media, the options are available. Just click on the share
            icon.
          </li>
        </ul>
        <br />
        <li style={{ paddingLeft: '0.5em' }}>My Accounts</li>
        <ul style={{ marginLeft: '20px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Upgrade Plan</li>
          <li style={{ paddingLeft: '1em' }}>Upgrade Plan</li>
          <li style={{ paddingLeft: '1em' }}>Upgrade Plan</li>
          <li style={{ paddingLeft: '1em' }}>Billing History</li>
          <li style={{ paddingLeft: '1em' }}>Logout</li>
        </ul>
      </ul>
    </div>
  </div>
)

export const YourAccountContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Your Account</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>
        The “Your Account” option can be found on the top right corner of your screen. If you are using mobile, Click on
        “More” found at the bottom and then “My Account”.
      </p>
      <br />
      <p style={{ fontWeight: 450 }}>These are the options you find in your accounts section.</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Upgrade plan</li>
        <li style={{ paddingLeft: '1em' }}>Billing History</li>
        <li style={{ paddingLeft: '1em' }}>Logout</li>
      </ul>
      <br />

      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/JtowKy0CEvY?start=1" />
      </div>
      <br />
      <br />
      <p style={{ fontWeight: '600' }}>Upgrade Plan</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on the “Upgrade plan” below store plan in the dashboard home page, or click on your profile and then on
          the “Upgrade plan” displayed below.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you are using mobile, Click on “More” found at the bottom, then “My Account” and then the “Upgrade
          plan”.
        </li>
        <li style={{ paddingLeft: '1em' }}>You can go with a monthly plan or yearly, switch the toggle to change</li>
        <li style={{ paddingLeft: '1em' }}>Click on the contact us button for your desired plan</li>
        <li style={{ paddingLeft: '1em' }}>Fill in all the details and submit the form. </li>
        <li style={{ paddingLeft: '1em' }}>
          Our team member will reach out to you within 24 hours, to upgrade you to this plan you choose.
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600' }}>Billing History</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on your profile and then on the “Billing History” listed in the dropdown.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you are using mobile, Click on “More” found at the bottom, then “My Account” and then the “Billing
          History”.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Here, you can check your current plan, which is highlighted and the next renewal or payment date.
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600' }}>Logout</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          If you want to log out from your account, Go to your profile and then click on the “Logout” listed in the
          dropdown.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you are using mobile, Click on “More” found at the bottom, then “My Account” and then the “Logout”.
        </li>
      </ul>
    </div>
  </div>
)

export const ProductsOfGoPlintoContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Products of GoPlinto</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: '600' }}>Did you know these facts?</p>

      <br />
      <p style={{ fontWeight: '600' }}>It takes...</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          <span style={{ fontStyle: 'italic' }}>
            "On average anywhere between three to nine months to develop a mobile shopping app" -{' '}
          </span>
          <a
            style={{ color: '#f87a88', textDecoration: 'underline' }}
            href="https://3sidedcube.com/en-us/"
            rel="noopener"
          >
            3sidedcube.com
          </a>
        </li>
        <li style={{ paddingLeft: '1em' }}>
          <span style={{ fontStyle: 'italic' }}>
            "Around 14 weeks to set up a shopping e-commerce website from start to launch." -{' '}
          </span>
          <a
            style={{ color: '#f87a88', textDecoration: 'underline' }}
            href="https://www.billerickson.net/"
            rel="noopener"
          >
            billerickson.net
          </a>
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600' }}>Average cost...</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          {' '}
          <span style={{ fontStyle: 'italic' }}>
            "To create a custom <span style={{ fontWeight: '600' }}> web design layout </span> is skyrocketing up to{' '}
            <span style={{ fontWeight: '600' }}>INR 5000- INR 15,000 per page"</span> -{' '}
          </span>
          <a style={{ color: '#f87a88', textDecoration: 'underline' }} rel="noopener" href="http://devigntech.com/">
            devigntech.com
          </a>
        </li>
        <li style={{ paddingLeft: '1em' }}>
          <span style={{ fontStyle: 'italic' }}>
            "On average, it costs around <span style={{ fontWeight: '600' }}>$20,000 or Rs 10 Lakhs</span> to develop an
            e-commerce shopping <span style={{ fontWeight: '600' }}>mobile app for Android & iOS"</span> -{' '}
          </span>
          <a style={{ color: '#f87a88', textDecoration: 'underline' }} rel="noopener" href="http://businessofapps.com/">
            businessofapps.com
          </a>
        </li>
        <br />
      </ul>
      <p style={{ fontWeight: '600' }}>This is where GoPlinto comes in...</p>
      <p style={{ fontWeight: '500' }}>
        We are providing the following at the lowest price possible, in the span of 10 minutes to 1 week. Now you can
        get
      </p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>eCommerce Website</li>
        <li style={{ paddingLeft: '1em' }}>PWA app</li>
        <li style={{ paddingLeft: '1em' }}>Mobile Application in Android and iOS</li>
      </ul>
      <br />
      <p style={{ fontWeight: '500' }}>Reach out to us with your requirements, we will get it done for you! </p>
      <p style={{ fontWeight: '500' }}>
        Email us at{' '}
        <a style={{ color: '#f87a88', textDecoration: 'underline' }} rel="noopener" href="mailto:hello@goplinto.com">
          hello@goplinto.com
        </a>{' '}
        or WhatsApp us at +91-936-090-3798
      </p>
    </div>
  </div>
)

export const CustomizeWebsiteContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Customize your website</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>
        To customize the theme, Go to “Store settings” and click on “Website Theme” in the Theme Settings.
      </p>
      <br />
      <p style={{ fontWeight: 500 }}>
        You need to add the following data to complete the customization of your website
      </p>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Store Logo</li>
        <li style={{ paddingLeft: '1em' }}>Store banner Images</li>
        <li style={{ paddingLeft: '1em' }}>Colour Scheme</li>
        <li style={{ paddingLeft: '1em' }}>Layout</li>
      </ul>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/XJzYKp5QyR0?start=1" />
      </div>
      <br />
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Store Logo</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          You can add the store logo by clicking on “Upload image” below the title and upload the image from your local
          device
        </li>
        <li style={{ paddingLeft: '1em' }}>Make sure the image is of 512*512 resolution and file size less than 1Mb</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Store Banner Images</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          You can add the banner by clicking on “Upload image” below the title and upload the image from your local
          device
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Make sure the image is of 1600*400 resolution and file size less than 1Mb
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Target URL is a way you can direct your customers to a specific product detail page when they click on that
          specific banner
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To get the page URL, open that page in the website, you will find a URL as shown here -{' '}
          <a
            style={{ color: '#f87a88', textDecoration: 'underline' }}
            href="https://devo.goplinto.com/Pizzera/100/item/4001"
            rel="noopener"
          >
            https://devo.goplinto.com/Pizzera/100/item/4001
          </a>{' '}
          Copy and paste the URL in the blank shown below the image in the banner pop-up
        </li>
        <li style={{ paddingLeft: '1.5em' }}>Click on “Ok” to confirm.</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Colour Scheme</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>You can either choose the colour from the four colours displayed there.</li>
        <li style={{ paddingLeft: '1em' }}>
          In case, you have your own theme colour, Get the hex code of the colour and add the hex code value in the box
          and click on “apply”
        </li>
      </ul>

      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Layout</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>You can either choose the Grid layout or the List layout</li>
        <li style={{ paddingLeft: '1em' }}>
          The layout you choose will be the way the products are displayed on your website.
        </li>
      </ul>
      <p style={{ fontWeight: 500 }}>
        Save the changes once you are done. Now, Checkout the website to see the latest updated changes that you have
        made.
      </p>
    </div>
  </div>
)

export const ProductsContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Products</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>Let’s get to know the following things</p>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Add & edit product</li>
        <li style={{ paddingLeft: '1em' }}>Create Category</li>
        <li style={{ paddingLeft: '1em' }}>Create Subcategory</li>
        <li style={{ paddingLeft: '1em' }}>Store Tax</li>
        <li style={{ paddingLeft: '1em' }}>Manage the availability of the product</li>
        <li style={{ paddingLeft: '1em' }}>Share Product</li>
      </ul>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/HwNpu115DZI?start=1" />
      </div>
      <br />
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Add & edit product</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on “inventory” and then on the “Add product” button in the top right corner.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          First comes the product image, Add the image by clicking on “Upload image” below the title and upload the
          image from your local device.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          You can upload up to 4 images, Make sure the image is of 512*512 resolution and file size less than 1Mb.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Add name, actual price or MRP and selling price, The selling price can be less if there is any discount or the
          same as the MRP.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To add a category and subcategory, click on the drop-down and choose the name of your choice. To create them,
          check the instructions - Create Category and Create SubCategory listed below.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Add the description of your product in the text box under the title description.
        </li>
        <li style={{ paddingLeft: '1em' }}>Turn on the toggle to make the item available below Availability</li>
        <li style={{ paddingLeft: '1em' }}>
          Coming to adding tax to the product, You can turn on the toggle of tax configuration if the price you have
          added is inclusive of tax, keep it turned off if it’s exclusive of tax
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To map a tax code, click on the drop-down, Choose a tax code with whatever percentage you need. To create a
          tax code, check the instructions - Create Store Tax listed below.
        </li>
        <li style={{ paddingLeft: '1em' }}>Once you are all done, click on the “Add Product” to save the changes.</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Create Subcategory</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on “inventory” and then on the “Add product” button in the top right corner.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Scroll down slightly until you see the “Category” and “Sub Category” title
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Click on the drop-down below the category title and choose the category to which you want to create a new
          subcategory
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Now, Click on the drop-down below the Subcategory title and then on “+Create new subcategory”
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In the pop-up that has opened, make sure that your category name is displayed to which you desire to create a
          subcategory in the drop-down.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Type in your Subcategory name in the text box and click on the “Create New SubCategory” button to save the
          changes
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Please note that this process in one time and once these Subcategories are created, you can reuse them to
          group your products
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To edit subcategory, click on “inventory”, the page that opened up is where you can edit.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Choose the category you want to edit, the list of categories are listed on the left side and then click on the
          “Edit” that is placed straight across the category title.{' '}
        </li>
        <li style={{ paddingLeft: '1em' }}>Make your changes and click on “Save Changes”</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Create Store Tax</p>
      <p style={{ fontWeight: '600' }}>Method 1</p>

      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on “inventory” and then on the “Add product” button in the top right corner.
        </li>
        <li style={{ paddingLeft: '1em' }}>Scroll down slightly until you see the “Tax Charge” title</li>
        <li style={{ paddingLeft: '1em' }}>
          Click on the drop-down below the Tax Charge title and then on “+Create new tax”
        </li>
        <li style={{ paddingLeft: '1em' }}>In the pop-up that has opened, make sure to type in the</li>
        <ul style={{ marginLeft: '30px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Tax name (example: 5% standard tax)</li>
          <li style={{ paddingLeft: '1em' }}>Tax rate (example: 5)</li>
          <li style={{ paddingLeft: '1em' }}>Tax description (Optional)</li>
        </ul>
        <li style={{ paddingLeft: '1em' }}>Click on the “Create New tax” button to save the changes</li>
        <li style={{ paddingLeft: '1em' }}>
          Please note that this process in one time and once these Tax codes are created, you can reuse them for your
          other products
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600' }}>Method 2</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on “Store Settings” and then on the “Store taxes” in the Checkout settings section.
        </li>
        <li style={{ paddingLeft: '1em' }}>Once you are in, click on the “+Tax” button in the top right corner.</li>
        <li style={{ paddingLeft: '1em' }}>Make sure to type in the following things in the form,</li>
        <ul style={{ marginLeft: '30px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>Tax name (example: 5% standard tax)</li>
          <li style={{ paddingLeft: '1em' }}>Tax rate (example: 5)</li>
          <li style={{ paddingLeft: '1em' }}>Tax description (Optional)</li>
        </ul>
        <li style={{ paddingLeft: '1em' }}>Click on the “Add Tax” button to save the changes</li>
        <li style={{ paddingLeft: '1em' }}>
          Please note that this process in one time and once these Tax codes are created, you can reuse them for your
          other products
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Share Product</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on “inventory”, the page that opened up is where all the added products are displayed along with their
          name and price.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To make a product unavailable, you can toggle this availability button off
        </li>
        <li style={{ paddingLeft: '1em' }}>
          And to make it back available, Go to out of stock and turn the toggle on.
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Manage the availability of the product</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Click on “inventory”, the page that opened up is where all the added products are displayed along with their
          name and price.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          By clicking on the “Share” option you can share your product directly with your customers.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case, you want to share the link via social media, the options are available.
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: 500 }}>Now, Checkout the website to see the latest updated changes that you have made.</p>
    </div>
  </div>
)

export const PaymentConfigurationContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Payment mode</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>
        Setting payment mode is how you can decide on your customers can pay for the orders they are making.{' '}
      </p>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/mNDxjwfbxWA?start=1" />
      </div>
      <br />
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          To set up payment configuration, Go to “Store settings” and click on “Payment Configuration” in the Checkout
          Settings.
        </li>
        <li style={{ paddingLeft: '1em' }}>Click on “Start Accepting Payments”</li>
        <li style={{ paddingLeft: '1em' }}>
          Toggle on the desired payment mode by which you want your customers to pay through.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          There are two options, Cash on delivery or pay on delivery and Online Payment.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          The online payments consist of UPI, credit cards, debit cards, Wallets and more
        </li>
        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>For every online transaction, 3% will be deducted as
          payment gateway charges. You can either choose to add it to your customer bill by toggling on “enable
          convenience charge” or keep it turned off.
        </div>
      </ul>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          In case, you want to not provide a payment mode for a while, turn the toggle off.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Also, make sure to add the bank details for us to send the online payment money that has been collected. Check
          out - Setup Bank Details, for instructions on how to add them
        </li>
      </ul>
      <p style={{ fontWeight: 500 }}>Now, Checkout the website to see the latest updated changes that you have made.</p>
    </div>
  </div>
)

export const DeliveryConfigurationContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Delivery mode</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>
        Setting Delivery mode is how you can decide on how would you serve your customers or how they can buy from you
      </p>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/XXRSJe62kF0" />
      </div>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          To set up Delivery configuration, Go to “Store settings” and click on “Delivery configuration” in the Checkout
          Settings.
        </li>
        <li style={{ paddingLeft: '1em' }}>Click on “Start Delivering”</li>
        <li style={{ paddingLeft: '1em' }}>
          Toggle on the desired Delivery mode by which you want to serve your customers.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          There are two options, Delivery, where you deliver to your customers and self-pickup, where they can visit the
          store and pick up the products.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          For delivery, You can add a flat delivery charge, which you would like to collect from your customer, by
          checking this box or, keep it unchecked if you want to do it for Free.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          For pickup, Add a pick-up address or the store address, to where your customers are supposed to come, by
          clicking on the “Add a pickup address”.
        </li>
        <li style={{ paddingLeft: '1em' }}>Add all the details in the form and save the changes.</li>
        <li style={{ paddingLeft: '1em' }}>
          In case, you want to not provide a delivery mode for a while, turn the toggle off.
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: 500 }}>Now, Checkout the website to see the latest updated changes that you have made.</p>
    </div>
  </div>
)

export const ManageOrderContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Orders</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>
        Let’s learn how to check and process your orders that have been placed by your customers. To do that, Go to the
        “Your Orders” section. In this section you can view all the orders or go to the respective status of the order
        by clicking on the “New Orders”, “Mark Ready/ Dispatched Orders” and “Mark Delivered”.
      </p>
      <br />
      <p style={{ fontWeight: 500 }}>
        You can find the Name, phone number, Order type and Payment mode on the order card. If you want to view more
        details about the bill and product details, click on the “View details” on the respective card.
      </p>
      <br />
      <p style={{ fontWeight: '600' }}>If Order type is “Delivery”, follow these steps</p>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Check out the payment mode, If it is “Cash On Delivery”, then make sure to collect payment at the delivery of
          products.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          If it’s “Online Payment”, then it means the customer has paid on the website, and we(Goplinto) will initiate
          the payout to your bank account at the chosen payout cycle.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          First step, Go to the “New orders” tab, Checkout the details of order and click on “Accept Order” button, this
          sends a confirmation email and message to your customer.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you want to cancel your order as you are unable to deliver it, the option is available. Click on the
          “Reject Order” button to do so.{' '}
        </li>
        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>Once the order is accepted/ confirmed, you cannot
          cancel the order anywhere in the system.
        </div>
        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>If you cancel an order, which is of “Online
          payment”, you need to have to refund the customer on your own. We don't support refunds. However, We will send
          all the amount we have collected to you as payout, that is even the once that you have rejected/cancelled.
        </div>
        <br />

        <li style={{ paddingLeft: '1em' }}>
          Once the package is ready to be shipped or it is picked up by the delivery executive for delivery, Go to the
          “Mark ready/ Dispatched” tab and Click on “Mark Ready”. A notification informing the same will be sent to your
          customer.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          After the package is delivered/ shipped, Go to the “Mark Delivered” tab and Click on “Mark Delivered”. A
          notification informing the same will be sent to your customer and this order is marked as completed!
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600' }}>If Order type is “Pickup”, Follow these steps</p>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          Check out the payment mode, If it is “Cash On Delivery”, then make sure to collect payment at the delivery of
          products.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          If it’s “Online Payment”, then it means the customer has paid on the website, and we(GoPlinto) will initiate
          the payout to your bank account at the chosen payout cycle.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          First step, Go to the New orders tab, Checkout the details of order and click on the “Accept Order” button,
          this sends a confirmation email and message to your customer.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you want to cancel your order as you are unable to deliver it, the option is available. Click on the
          “Reject Order” button to do so.{' '}
        </li>

        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>Once the order is accepted/ confirmed, you cannot
          cancel the order anywhere in the system.
        </div>
        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>If you cancel an order, which is of “Online
          payment”, you need to have to refund the customer on your own. We don't support refunds. However, We will send
          all the amount we have collected to you as payout, that is even the once that you have rejected/ cancelled.
        </div>
        <br />
        <li style={{ paddingLeft: '1em' }}>
          Once the package is ready to be picked up by your customer, Go to the “Mark ready/ Dispatched” tab and Click
          on “Mark Ready”. A notification informing the same will be sent to your customer.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          After the package is delivered/ Picked up by your customer, Go to the “Mark Delivered” tab and Click on “Mark
          Delivered”. A notification informing the same will be sent to your customer and this order is marked as
          completed!
        </li>
      </ul>
    </div>
  </div>
)

export const ReportsAnalyticsContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Reports</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>These are the following reports that we provide</p>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Reports Overview</li>
        <li style={{ paddingLeft: '1em' }}>Orders Report</li>
        <li style={{ paddingLeft: '1em' }}>Customer Report</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Reports Overview</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>To Check the overview of the report, click on “Dashboard”.</li>
        <li style={{ paddingLeft: '1em' }}>You will find an overall report for the day of the following stats</li>
        <ul style={{ marginLeft: '30px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>
            Total Sales - Total amount of sales that have been generated via the website.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            Total Orders - Total number of orders (Delivered /Cancelled) that has been placed through the website.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            Total customers - Total number of customers, who have placed orders on the website.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            Total Items - Total number of unique items that have been purchased on the website.
          </li>
        </ul>
      </ul>
      <br />
      <p style={{ fontSize: '20px', fontWeight: '600' }}>Orders Report</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          To access the orders report, Go to the “Your orders” section, click on “past orders” displayed on the
          top-right corner
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Here you can check today’s, yesterday’s and custom range, delivered and cancelled orders data. Try the
          drop-down to change the options
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To get a custom range orders report, Click on the calendar, choose the start and end date.
        </li>
        <li style={{ paddingLeft: '1em' }}>Click on the “Generate Report” button.</li>
        <li style={{ paddingLeft: '1em' }}>
          An email will be sent to the email Id mentioned there, that is, the email id you have provided in the Contact
          info
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you want to change the email id, Go to “Store Settings” and then “Contact Info”.
        </li>
        <li style={{ paddingLeft: '1em' }}>Check your email account in a while for the report.</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Customer Report</p>
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/sNP7Wvgeekk?start=1" />
      </div>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          To access the Customers report, Go to the “Reports and Analytics” section, Click on export customer details.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Choose the customer base you want to download, from the provided segments
        </li>
        <ul style={{ marginLeft: '30px' }} className="list-disc">
          <li style={{ paddingLeft: '1em' }}>
            Registered Browsers/ All customers - List of all the users who have created an account in your store.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            Idle/ Inactive Customers - List of users who have not visited or placed an order in the past 6 months span.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            Cart Abandoners - List of users who have added items in the cart but haven't placed an order in the past 6
            months span.
          </li>
          <li style={{ paddingLeft: '1em' }}>
            Loyal customers - List of all the users who have placed one or more orders in the past 6 months span.
          </li>
        </ul>
        <li style={{ paddingLeft: '1em' }}>Click on export, once you have chosen the segment</li>
        <li style={{ paddingLeft: '1em' }}>
          An email will be sent to the email Id mentioned there, that is, the email id you have provided in the Contact
          info
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you want to change the email id, Go to “Store Settings” and then “Contact Info”.
        </li>
        <li style={{ paddingLeft: '1em' }}>Check your email account in a while for the report.</li>
      </ul>
    </div>
  </div>
)

export const BasicSettingsContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Basic Settings</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: 500 }}>Let’s get to know, how to add the following things,</p>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Bank Details</li>
        <li style={{ paddingLeft: '1em' }}>Social Accounts</li>
        <li style={{ paddingLeft: '1em' }}>SEO settings</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Bank Details</p>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/TMgD_Mxg_ys?start=1" />
      </div>
      <br />
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          If you are accepting online payments from your customers, make sure to add bank details.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          To add Bank details, Go to “Store settings” and click on “Bank details” in the General Settings.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Click on edit, Now add your bank name, Account number, Account name, and Branch name.
        </li>

        <br />
        <div className="border-l" id="note">
          <p style={{ color: '#1492e6', fontSize: '18px' }}>Note</p>
          Please note that we will be sending the online payments that we have collected as payouts to this bank account
          deducting the payout transition fee based on the plan you opted for.
        </div>
      </ul>
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>Congratulations! You have successfully set up your bank details.</li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Social Accounts</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          To add your social media accounts on your website, so that your customers can follow you on your respective
          pages/ channel, you need to follow these below steps
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Go to “Store Settings”, scroll down a bit and you will see Social Accounts in Other settings.
        </li>
        <li style={{ paddingLeft: '1em' }}>Click on “edit”, and then on the “edit social media accounts”</li>
        <li style={{ paddingLeft: '1em' }}>
          Choose the social media accounts in which your brand has a presence, you can choose up to 5 accounts.
        </li>
        <li style={{ paddingLeft: '1em' }}>Click on “Save Changes”, once done.</li>
        <li style={{ paddingLeft: '1em' }}>
          Add the link to your page in the text box under its respective social media account icon. Once again, click on
          “Save changes” to confirm.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Now, Checkout the website to see the latest updated changes that you have made.
        </li>
      </ul>
      <br />
      <p style={{ fontWeight: '600', fontSize: '20px' }}>SEO Accounts</p>
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>
          To set up SEO Settings, Go to “Store settings” and click on “SEO Settings” in the Other Settings.
        </li>
        <li style={{ paddingLeft: '1em' }}>Click on the “Edit” button</li>
        <li style={{ paddingLeft: '1em' }}>Add the name/title, Keywords and description.</li>
        <li style={{ paddingLeft: '1em' }}>Please note that You can add up to 5 keywords.</li>
        <li style={{ paddingLeft: '1em' }}>Save changes once done.</li>
        <li style={{ paddingLeft: '1em' }}>That’s all! You set the SEO for your website successfully.</li>
      </ul>
    </div>
  </div>
)

export const IntegrationsContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Analytics</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Google Analytics Integration</p>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/wRhms0aeMQ0?start=1" />
      </div>
      <br />
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>To set up Google Analytics, Go to “Integrations”.</li>
        <li style={{ paddingLeft: '1em' }}>Click on the “Connect button” under Google Analytics.</li>
        <li style={{ paddingLeft: '1em' }}>
          Copy and paste the Google Analytics tracking ID in the text box below the title. The tracking id will be in
          the format of UA-000000-2
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case, you want to learn more on how to get your tracking ID, check out this document by Google -{' '}
          <a
            href="https://support.google.com/analytics/answer/1008080?hl=en#zippy=%2Cin-this-article"
            style={{ textDecoration: 'underline', color: '#f87a88' }}
            rel="noopener"
          >
            https://support.google.com/analytics/answer/1008080?hl=en#zippy=%2Cin-this-article
          </a>
        </li>
        <li style={{ paddingLeft: '1em' }}>
          This is all, you have successfully integrated your website with Google analytics. You can go ahead, and check
          google dashboard for the analytics data.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case, you need to edit the tracking id or want to disconnect it for a while, the options are available.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          Go back to the Integrations page, click on the three dots in the card, you will come across edit and
          disconnect options.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          That’s all! You have successfully integrated your website with Google Analytics.
        </li>
      </ul>
    </div>
  </div>
)
export const MarketingContent = () => (
  <div>
    <p style={{ fontWeight: '600', fontSize: '28px' }}>Marketing</p>
    <div style={{ fontSize: '16px' }}>
      <p style={{ fontWeight: '600', fontSize: '20px' }}>Branding Page</p>
      <br />
      <div style={{ position: 'relative', width: '100%', overflow: 'hidden', paddingTop: '56.25%' }}>
        <Youtube src="https://www.youtube.com/embed/60ZE5nmgPJw" />
      </div>
      <br />
      <br />
      <ul style={{ marginLeft: '20px' }} className="list-disc">
        <li style={{ paddingLeft: '1em' }}>To check out the branding page, Go to “Marketing & Branding”.</li>
        <li style={{ paddingLeft: '1em' }}>Click on the Branding card.</li>
        <li style={{ paddingLeft: '1em' }}>
          Here you can select and download QR posters and business cards of your choice from these multiple designs.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          These cards are automatically filled with all the data you have provided.
        </li>
        <li style={{ paddingLeft: '1em' }}>
          You can share these cards and posters directly by clicking on the share option or download them to your local
          device by clicking on the download icon on the respective design
        </li>
        <li style={{ paddingLeft: '1em' }}>
          In case you want to change any data that is displayed in this card, you can do so, by going to the “Contact
          info” and “Store details” pages in Store Settings.
        </li>
      </ul>
    </div>
  </div>
)
