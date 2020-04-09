import React from "react";
import AppContext from "./context";
import App from "./App";
import { produce } from "immer";

/** The context provider for our app */
export default class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.actions = {
      changeCampaigns: this.changeCampaigns,
      changeSearch: this.changeSearch,
      changepage: this.changepage,
      changeSearchBox: this.changeSearchBox,
      pageback: this.pageback,
    };
    this.state = {
      campaigns: "",
      search: "default",
      page: 0,
      searchBox: "default",
    };
  }
  changeCampaigns = (variable) => {
    this.setState((state) =>
      produce(state, (draft) => {
        draft.campaigns = variable;
      })
    );
  };
  changeSearchBox = (variable) => {
    this.setState((state) =>
      produce(state, (draft) => {
        draft.page = 0;
        draft.searchBox = variable;
      })
    );
  };
  changeSearch = (variable) => {
    this.setState((state) =>
      produce(state, (draft) => {
        draft.page = 0;
        draft.search = variable;
      })
    );
  };
  changepage = (s) => {
    this.setState((state) =>
      produce(state, (draft) => {
        draft.page += s;
      })
    );
  };
  pageback = (s) => {
    this.setState((state) =>
      produce(state, (draft) => {
        if (s > 10) {
          draft.page -= s;
        } else {
          draft.page = 0;
        }
      })
    );
  };
  render() {
    return (
      <AppContext.Provider value={{ ...this.state, ...this.actions }}>
        <App />
      </AppContext.Provider>
    );
  }
}
