const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
    },
    actions: {
      protect: (token) => {
        fetch(process.env.BACKEND_URL + "/api/protected", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((result) => setStore({ key: result }));
      },

      syncTokenFromSessionStore: () => {
        const token = sessionStorage.getItem("token");
        if (token && token != "" && token != undefined)
          setStore({ token: token });
      },

      logout: () => {
        sessionStorage.clear();
        setStore({ token: null });
      },

      reset: async (email) => {
        const options = {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
            // "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
          },
          body: JSON.stringify({
            email: email,
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/reset_password",
            options
          );
          if (resp.status !== 200) {
            alert("There has been some error!!!");
            return false;
          }
        } catch (error) {
          console.error("There has been an error", error);
        }
      },

      login: async (username, password) => {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        };

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/login",
            options
          );
          if (resp.status !== 200) {
            alert("There has been some error!!!");
            return false;
          }
          const data = await resp.json();

          // console.log("this came from the backend", data);

          sessionStorage.setItem("token", data.access_token);
          setStore({ token: data.access_token });
          return true;
        } catch (error) {
          console.error("There has been an error", error);
        }
      },

      createUser: (first_name, last_name, email, username, password) => {
        fetch(process.env.BACKEND_URL + "/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": process.env.FRONTEND_URL,
          },
          body: JSON.stringify({
            first_name,
            last_name,
            username,
            email,
            password,
          }),
        })
          .then((resp) => resp.json())
          .then((data) => {
            setStore({ user: data });
            console.log(data);
          })
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },

      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
