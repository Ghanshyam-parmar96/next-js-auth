// import { getToken } from "@/lib";

const fetcher = async (url: string, header:string | null) => {    
    // const header: string | undefined =  getToken();
  try {
    const query = await fetch(`${process.env.BACKEND_URI}/${url}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Cookie : header ?? "",
      },
      // body: JSON.stringify({
      //     title: 'foo',
      //     body: 'bar',
      //     userId: 1,
      //   }),
    });
    return query.json();
  } catch (error : any) {
    console.log(error.message);
  }
};

export default fetcher;