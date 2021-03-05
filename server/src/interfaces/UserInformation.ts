export default interface UserInformation {
  id: string,
  firstName: string,
  lastName: string,
  city: string
}

export function checkUserInformation(userInformation: UserInformation): boolean {
  let userInformationCorrect = true;

  Object.values(userInformation).forEach((value) => {
    if (typeof value === "undefined") {
      userInformationCorrect = false;
    }
  });
  return userInformationCorrect;
}