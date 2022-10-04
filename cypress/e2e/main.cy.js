describe("login", () => {
  before(() => {
    cy.visit(
      "https://kyber.arche.services/api/v1/learner/curricula/67c8273c-1b6e-4d6d-9110-845f073f196f/activities/a8c60a05-23f5-4a0f-b8c2-90d2e413f097/authorize?identity-provider=kyber-staging"
    );
  });

  it("login page contains correct content", () => {
    cy.get("#prompt-logo-center").should("exist");
    cy.contains("Welcome").should("exist");
    cy.contains("Log in to kyber-staging to continue to kyber-staging.").should(
      "exist"
    );
    cy.contains("Email address").should("exist");
    cy.contains("Password").should("exist");
    cy.get("input#username").should("exist");
    cy.get("input#password").should("exist");
    cy.contains("Continue").click();
    cy.contains("Forgot password?").should("exist");
    cy.contains("Don't have an account?").should("exist");
    cy.contains("Sign up").should("exist");
    cy.contains("Or").should("exist");
    cy.contains("Continue with Google").should("exist");
  });

  it("can login to the application", () => {
    cy.login("CandIntern2@somewhere.com", "WinterIzHere7!");
  });
});

describe("activity", () => {
  /* For new users */
  it.skip("activity page contains correct content", () => {
    cy.contains("A Video Based Activity For the Ages!").should("exist");
    cy.contains("Before you proceed, please fill in the following:").should(
      "exist"
    );
    cy.contains("First Name").should("exist");
    cy.contains("Last Name").should("exist");
    cy.contains("Continue").should("exist");
  });

  it.skip("can type then submit first name and last name", () => {
    cy.get("input").eq(0).type("Kiana", { delay: 50 });
    cy.get("input").eq(1).type("McCullough", { delay: 50 });
    cy.contains("Continue").click();
    cy.get('[data-test="play-video-button"]').click();
  });

  /* For existing users */
  it("can play through the video and detect notes", () => {
    cy.url().should("include", "/curriculum");
    //cy.contains("Please wait while your page loads").should("exist");
    cy.contains("A Video Based Activity For the Ages!", {
      timeout: 10000,
    }).should("exist");
    cy.contains("What would you like to do?").should("exist");
    cy.contains("Start At The Beginning").click();
    cy.get("video#main-activity-player_html5_api").should("exist");
    cy.wait(6000);
    cy.contains("Can you see this message? - ").should("exist"); // first note
    cy.contains("It would be nice to know if this note shows up").should(
      "exist"
    );
    cy.contains("View Resources").should("exist");
    cy.wait(17000);
    cy.contains("0:00:21").should("exist");
    cy.get('[data-test="active-moment-type-note"]', {
      timeout: 10000,
    }).should("exist");
    cy.contains("Educator Note").should("exist");
    cy.contains("This pauses the video").should("exist"); // second note
    cy.get('[data-test="thumbtack-to-pin"]').should("exist");
    cy.get('[data-test="continue-button-moment"]').should("exist");
    cy.get('[data-test="add-note-button-moment"]').should("exist");
    cy.contains("RESUME VIDEO").should("exist").should("exist");
    cy.get('[data-test="play-video-button"]').click();
  });

  it("activity review page contains correct content", () => {
    cy.wait(8000);
    cy.contains("Personalizing your Activity Review…").should("exist");
    cy.get("img").should("have.attr", "alt", "Kyber Staging logo");
    cy.contains("You have completed this Activity").should("exist");
    cy.contains("You can revisit the Activity").should("exist");
    cy.contains("Revisit Activity").should("exist");
    cy.contains("Go Home").should("exist");
    cy.contains("Your Recommendations").should("exist");
    cy.contains("Your Notes").should("exist");
    cy.contains("Your Pinned Content").should("exist");
    cy.contains("Terms & Conditions").should("exist");
    cy.contains("Privacy Policy").should("exist");
    cy.contains("Powered By").should("exist");
    cy.contains("ArcheMedX").should("exist");
  });

  it("two notes/moments exist", () => {
    cy.contains("I hope you aren't afraid of heights").should("exist");
    cy.contains("This pauses the video").should("exist");
    cy.contains("IMG_2487.jpg").should("exist");
    cy.contains("Climbing Ladders!").should("exist");
    cy.contains("Can you see this message?").should("exist");
    cy.contains("chasetag.mp4").should("exist");
  });

  it.skip("go home button is clicked", () => {
    cy.contains("Go Home", { timeout: 10000 }).click();
  });
});
