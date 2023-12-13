describe("Events queries", () => {
  it("In the US winter, order should be Aus, E2, E1", () => {
    // const reqQuery = {
    //   start: new Date("2023-02-01").toISOString(),
    // }
    cy.request({
      method: "GET",
      url: "/events",
      // qs: reqQuery,
      failOnStatusCode: false,
    }).then((response) => {
      console.log(response.body.map((event) => event.name))
      expect(response.status).to.equal(200)
      expect(response.body.map((event) => event.name)).to.deep.equal([
        "Mo-0845-Aus",
        "E2",
        "E1",
      ])
    })
  })
  // it("returns the next 25 closed discussion meetings as a given time.", () => {
  //   const testTypes = ["C", "D"]
  //   const reqQuery = {
  //     types: JSON.stringify(testTypes),
  //   }
  //   cy.request({
  //     method: "GET",
  //     url: "/meetings/next",
  //     qs: reqQuery,
  //     failOnStatusCode: false,
  //   }).then((response) => {
  //     expect(response.status).to.equal(200)
  //     const meetings = response.body
  //     expect(meetings.length).to.equal(25)
  //     expect(
  //       meetings
  //         .map((meeting: { types: string | string[] }) =>
  //           testTypes.every((element) => meeting.types.includes(element)),
  //         )
  //         .every((el: boolean) => el === true),
  //     ).to.be.true
  //   })
  // })
})
