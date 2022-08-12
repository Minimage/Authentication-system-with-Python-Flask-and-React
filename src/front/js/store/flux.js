import axios from "axios";

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
      //____________________________________________________________________________________________________________
      mandarinText: "",
      audioLink: "",
      wordLink: [],
      current_lesson: { name: undefined, next: null },
      user: null,
      key: [],
      token: null,
      userdata: {},
      myQuestion: [],
      myOptions: [],
      lesson_paraLink: [],
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

      myData: () => {
        getActions().syncTokenFromSessionStore();

        const config = {
          headers: { Authorization: `Bearer ${getStore().token}` },
        };
        // console.log("this is the config",config);
        axios
          .get(process.env.BACKEND_URL + "/api/user", config)
          .then((res) => {
            setStore({ userdata: res.data });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {});
      },

      getQuestions: () => {
        getActions().syncTokenFromSessionStore();

        const config = {
          headers: { Authorization: `Bearer ${getStore().token}` },
        };

        axios
          .get(process.env.BACKEND_URL + "/api/questions", config)
          .then((res) => {
            setStore({ myQuestion: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
      },

      getOptions: () => {
        getActions().syncTokenFromSessionStore();

        const config = {
          headers: { Authorization: `Bearer ${getStore().token}` },
        };
        // console.log("This is config",config)

        axios
          .get(process.env.BACKEND_URL + "/api/options", config)
          .then((res) => {
            setStore({ myOptions: res.data });
          })
          .catch((err) => {
            console.log(err);
          });
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

      getAudio: async (word) => {
        try {
          const response = fetch(
            process.env.BACKEND_URL + `/api/vocab_words/${word}`
          );
          if (response.ok) {
            const data = response.json();
            setStore({ audioLink: data.audio });
            return true;
          }
        } catch (error) {
          throw Error("this is my error", error);
        }
        // fetch(`https://api.pons.com/v1/dictionaries?language=zh/${word}`)
        // fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      },
      //____________________________________________________________________________________________________________
      getMessage: () => {
        // fetching data from the backend
        fetch(process.env.BACKEND_URL + "/api/hello")
          .then((resp) => resp.json())
          .then((data) => setStore({ message: data.message }))
          .catch((error) =>
            console.log("Error loading message from backend", error)
          );
      },
      getWords: async () => {
        // fetching data from the backend
        try {
          const response = await fetch(
            process.env.BACKEND_URL + `/api/answers`,
            {
              methods: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          // const data = await response.json();
          if (response.ok) {
            const data = await response.json();
            setStore({ wordLink: data });
            // console.log(data);
            return true;
          }
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      // getWords: (word) => {
      //   getActions().syncTokenFromSessionStore();

      //   const config = {
      //     headers: { Authorization: `Bearer ${getStore().token}`,
      //     "Access-Control-Allow-Origin": process.env.FRONTEND_URL, },
      //   };
      //   console.log(config);

      //   axios
      //     .get(process.env.BACKEND_URL + `/api/lesson1_vocab/${word}`, config)
      //     .then((res) => {
      //       setStore({ wordLink: res });
      //       console.log(res.data.mandarin) +console.log(res)
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     })
      //     .finally(() => {
      //       // console.log(myData);
      //     });
      // },

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

    getLesson_para: () => {
      // fetching data from the backend
      fetch(process.env.BACKEND_URL + `/api/lesson_para/`, {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => setStore({ lesson_paraLink: data }))

        .catch((error) =>
          console.log("Error loading message from backend", error)
        );
    },
  };
};

export default getState;
