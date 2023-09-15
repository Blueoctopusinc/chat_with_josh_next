export const devLog = (message: string, isError: boolean = false) => {
  if (process.env.NODE_ENV === "development") {
    isError ? console.error(message) : console.log(message);
  }
};
