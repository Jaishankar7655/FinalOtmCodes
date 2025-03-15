import React, { useState, useEffect } from "react";

function Band() {
  const serviceCategory = "band"; // Change this to the required service category
  const [services, setServices] = useState([]);
  const [catServices, setCatServices] = useState([]);

  // First API call to get all services
  useEffect(() => {
    const ApiUrl = `https://backend.onetouchmoments.com/user_controller/user_services/index_get/${serviceCategory}`;

    fetch(ApiUrl)
      .then((res) => res.json())
      .then((data) => {
        setServices(data.data);
        
        // If the first response contains service_cat, fetch the second API
        if (data.data.length > 0 && data.data[0].service_cat) {
          fetchCategoryServices(data.data[0].service_cat);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to fetch category-based services
  const fetchCategoryServices = (category) => {
    const ApiUrl2 = `https://backend.onetouchmoments.com/user_controller/user_services/index_get/${category}`;

    fetch(ApiUrl2)
      .then((res) => res.json())
      .then((data) => {
        setCatServices(data.data);
      })
      .catch((error) => {
        console.error("Error fetching category services:", error);
      });
  };

  return (
    <div>
      <h1>Band Services ({serviceCategory})</h1>
      <ul>
        {services.length > 0 ? (
          services.map((service) => (
            <li key={service.id}>{service.firm_name}</li>
          ))
        ) : (
          <p>No services found for {serviceCategory}</p>
        )}
      </ul>

      <h2>Related Services</h2>
      <ul>
        {catServices.length > 0 ? (
          catServices.map((service) => (
            <li key={service.id}>{service.firm_name}</li>
          ))
        ) : (
          <p>No related services found</p>
        )}
      </ul>
    </div>
  );
}

export default Band;
