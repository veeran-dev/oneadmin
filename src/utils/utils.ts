export const getLink = (link:string) => {
    if (link.includes("?")) {
      return link + "&squery=" + Math.random()
    }
    else
    {
      return link + "?squery=" + Math.random()
    }
  }