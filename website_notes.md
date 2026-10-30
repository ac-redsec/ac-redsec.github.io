# portfolio website


## Objective and Security measures

- As per the objective provided in the codecademy website for the full-stack developer path: 
    "*Typically, a portfolio website will have a main page that features different projects that you’ve built and another page that contains contact information, in case someone wants to reach out to you. Occasionally, there are additional pages for each project, detailing the technology used.*"

- So that means my website should have the following:

    - A main landing page featuring various projects I have built so far

    - Another page my contact information in case someone wants to reach out to me (*Have to ensure this doesn't end up adding to OSINT against me so I will ensure to not give any information that can be used against me; this implies that I need to follow with secure coding practices to ensure that even a basic static website with minimal interactivity and information cannot be used to initiate attacks against me.*)

    - Now the main concern here is that static websites, despite common misconception that their lack of databases or server-side processing makes them "hack-proof", they're actually quite susceptible to cyber attacks including Denial of Service (DoS), Cross-Site Scripting (XSS), and infrastructure compromises like domain hijacking, hosting account theft or leaked .git folders exposing sensitive code. There's also the chance of malicious actors using open redirects, CORS misconfigurations, or exposed back files to deface sites, distribute malware or steal my user data

    - Based on research online:

      - __What to include__:

        - _Professional email_ i.e., one that uses my real name; direct display of the email should be obfuscated via CSS/JS rendering or an image to avoid scrapers from harvesting it from the HTML source

        - _LinkedIn profile_ link gives recruiters a vetted, structured way to reach out to me, letting me control what's visible

        - _Github profile_ link is a natural source-control-focused portfolio and, therefore, my credibility signal

        - _A contact form_, though it's optional, it's recommended since a simple name + email + message form a honeyport field for bot protection; this keeps my inbox address out of the page source entirely

        - _General location/timezone_ is enough for a recruiter to assess fit without exposing my home address
        
        - _Availability status_ should be like a short opening; think "open to remote VAPT/backend/QA roles" or "not currently taking freelance projects" - these set expectations and filters out irrelevant outreach

        - _What a useful message should contain_ a kind of mass-spray deterence; think "Please include the company, role, and a brief description of the problem..."

      - __What to LEAVE OUT__:

        - _Personal phone number_ is an ABSOLUTE NO GO unless I include a separate business number

        - _Home or exact office address_ is a privacy risk and therefore should only include a general city-wide presence only

        - _Personal (non-professional) social media_ like instagram, a personal blog with location metadata, etc., poses an immense security risk

        - _Full legal name in the footer_ should NOT be included if a different professional name/brand is already in use

        - _ANY unmonitored contact channel_ like a dead email or stale profile leaves me worse off than no link at all

- __The idea is to make the right people reach out to me but leaving little to no raw material from my website for bots and scammers__

- Key security notes for mitigating associated concerns are as follows:

    - HTML should be obfuscated or a contact form should be used so that the email address never appears in the source. This is to mitigate concerns for email scraping.

    - Honeypot field + rate limiting with reCAPTCHA v3 for an extra layer of protection against any manner of Form spam
    
    - A one-line privacy note under the form: "Your details will only be used in responding to your enquiry", linking to a short privacy policy if I use any third-party form backend or analytics to mitigate GDPR (relevant for DE)

    - Check the kind of data collected and where it's stored which is disclosed in my privacy policy to manage Third-party form services


## Appearance

Now that the concerns have been addressed, let's move on to appearances and functionality coupled with interactivity
- what should my website look like? I'm going for a website that looks links are scrambled or encrypted and then reveal the real word once highlighted, giving the impression of an ethical hacker, red teamer or an elite red hat hacker.

- it clearly needs to be made with HTML/CSS and Javascript

- it needs to be a static website with some degree of interactivity infused into it using Javascript, so the idea mentioned in the first point regarding appearance stays