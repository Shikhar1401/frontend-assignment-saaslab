//fetch call type 
export const fetchKickstarterProjects = async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
      );
      const data = await response.json();
  
      if (!Array.isArray(data)) {
        throw new Error("Invalid API response structure");
      }
  
      // Convert keys from "percentage.funded" -> "percentageFunded"
      const transformedData = data.map((project) => ({
        sNo: project["s.no"],
        percentageFunded: project["percentage.funded"],
        amountPledged: project["amt.pledged"],
      }));
  
      return transformedData;
    } catch (error) {
      console.error("Error fetching projects:", error.message);
      return [];
    }
  };