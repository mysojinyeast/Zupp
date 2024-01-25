import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch("https://api.github.com/users/mysojinyeast");

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();

      this.setState({
        userInfo: json,
      });
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  }

  render() {
    const { name, location, avatar_url } = this.state.userInfo;

    if (!name || !location || !avatar_url) {
      return <div className="text-gray-500">Loading...</div>;
    }

    return (
      <div className="user-card bg-gray-100 p-4 rounded shadow-md">
        <img className="custom-image rounded-full w-16 h-16" src={avatar_url} alt="User Avatar" />
        <h2 className="text-xl font-bold mt-2">Name: {name}</h2>
        <h3 className="text-md">Location: {location}</h3>
        <h4 className="text-sm">Contact: 639210***</h4>
      </div>
    );
  }
}

export default UserClass;
