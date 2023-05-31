export default defineEventHandler(async (e) => {
  const body = await readBody(e);
  console.log(body);
  return {
    message: "success",
  };
});
