# Intro

Hi Adriana!

Thanks for taking the time to dive into our challenge. We understand this is an investment of time from your part, so we'll do our best to communicate effectively what to deliver.

# Expectations

This is a Fullstack challenge, we're expecting a working **prototype** of the functionality we're spec'ing below.

The challenge will be the ground work for a technical discussion, we expect a bit of thought put into how you structure your project - this can be as simple as not having everything happening under a `main()` function. It's expected that you elaborate during the technical discussion on what you'd do differently given the time.

Please try to refrain from using too many hours, set the target between ~2 to ~8 hours maximum.

# Technology stack

Feel free to use any tech stack you're most familiar with. Please don't use anything too niche though, like Perl, ABAP, or JavaScript. Just kidding, feel free to use JavaScript!

# The project!

You'll be building an app to help employees be on top of their newly learnt material, so you'll be implementing flashcards integrated with [OpenAI](https://platform.openai.com/docs/guides/gpt) (please use the `gpt-3.5-turbo` model and feel free to ask for an API key if you need one).

We really want to save the employees time, so all we'll ask them to provide is the subject they want to learn about and the app generates the learning material for them.

## User stories

- The user supplies a subject that they want to learn about and the application should generate 10 question/answer pair flashcards.
- These question/answer pairs should be available across restarts of the application.
- The user must be able to create several subjects
- When questions are shown, the answers must be hidden. The answer must be shown when the user wishes so - e.g.: by clicking a button or shaking their device.

If you're feeling you're short on time, feel free to present all the questions and answers at once, instead of providing the extra functionality of browsing through the questions.

Extras:

- The user is able to browse through the questions
- Automated tests

## Requirements

- Installation/setup instructions are supplied
- The app must be started by executing a `run.sh` bash script
- The app must execute without any errors

## UX/UI

Feel free to work out the app however you want, no need to be pretty, although HTML semantic structure is something we value. Here’s a mock design that you can use, but feel free to come up with your own! https://drive.google.com/file/d/1iahNyf5D932kSfGgGomnzifaRJuXKEj0/view?usp=sharing

