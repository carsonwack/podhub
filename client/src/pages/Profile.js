import React, { Component } from "react";
import Container from "../components/Container/container";
import Row from "../components/Row/row";
import API from "../utils/API";
import PostCard from "../components/PostCard/postCard";
import "./Profile.css";

// USER PROFILE PAGE

class Home extends Component {

    state = {
        posts: [],
        followers: 0,
        following: 0,
        favorites: []
    }

    componentDidMount() {
        this.getPostsOnlyByUser();
        this.getFavorites();
        // this.getOrCreateUser();
        this.getFollowers();
        this.getFollowing();
    };

    getPostsOnlyByUser = () => {
        API.getPostsOnlyByUser(this.props.user.id)
            .then(res => {
                if (res.data.length === 0) {
                    this.setState({
                        posts: [],
                        messageNoPodcast: "No posts found, post something."
                    })
                }
                else {
                    this.setState({
                        posts: res.data
                    });
                }
            })
            .catch(() => {
                this.setState({
                    posts: [],
                    messageNoPodcast: "No posts found, post something."
                });
            });
    };

    getFavorites = () => {
        API.getFavorites(this.props.user.id)
            .then(res => {
                if (res.data.length === 0) {
                    this.setState({
                        favorites: [],
                        messageNoFav: "No favorites found. Search for a podcast and add it to your favorites."
                    });
                }
                else {
                    this.setState({
                        favorites: res.data
                    });
                }
            })
            .catch(() => {
                this.setState({
                    favorites: [],
                    messageNoFav: "No favorites found. Search for a podcast and add it to your favorites."
                });
            });
    };

    getOrCreateUser = () => {
        API.getOrCreateUser(this.state.userId)
            .then(res => {
                this.setState({
                    user: res.data
                });
            });
    };

    getFollowers = () => {
        API.getFollowers(this.props.user.id)
            .then(res => {
                this.setState({
                    followers: res.data[0].count
                });
            })
            .catch(() => {
                this.setState({
                    followers: 0,
                });
            });
    };

    getFollowing = () => {
        API.getFollowing(this.props.user.id)
            .then(res => {
                this.setState({
                    following: res.data[0].count
                });
            })
            .catch(() => {
                this.setState({
                    following: 0,
                });
            });
    };

    handleFavoriteDelete = id => {
        API.deleteFavorite(id)
            .then(res => {
                this.getFavorites()
            });
    };

    render() {
        return (

            <Container >
                <div className="row userProfile rounded bg-light">
                    <div className="col-4">
                        <img src={this.props.user.profileImage} alt="User" id="userMainProfileImage" />
                    </div>

                    <div className="col-8">
                        <Row>
                            <h2>{this.props.user.name}</h2>
                        </Row>
                        <Row>
                            Posts:&nbsp; {this.state.posts.length} &nbsp; | &nbsp;
                            Followers:&nbsp;{this.state.followers}&nbsp; | &nbsp;
                            Following:&nbsp;{this.state.following}
                        </Row>
                    </div>
                </div>

                <div className="row favorites rounded">
                    <h4>Favorites: </h4>
                    
                    {this.state.favorites.length ? (
                        <Container>
                            {this.state.favorites.map(favorites => (

                                <div className="row border rounded favorite" key={favorites.id}>

                                    <div className="col-2 p-0">

                                        <img src={favorites.podcastIcon} alt="Podcast Icon" id="favoriteIcon" />
                                    </div>
                                    <div className="col p-0">
                                        <p>{favorites.podcastTitle}</p>
                                        <p>{favorites.podcastDescription}</p>
                                        <a href={favorites.link}>{favorites.link}</a> &nbsp;

                                            <button className="btn btn-sm mb-1 btn-light"
                                            onClick={() => this.handleFavoriteDelete(favorites.id)}
                                        >
                                            x
                                            </button>

                                    </div>
                                </div>
                            ))}
                        </Container>
                    ) : (
                            <div className="col">
                                <h5 className="text-center">&nbsp;{this.state.messageNoFav}</h5>
                            </div>
                        )}
                </div>
                <Row>
                    <h4>Recent posts:</h4>
                    {this.state.posts.length ? (
                        <Container>
                            {this.state.posts.map(post => (
                                <PostCard
                                    key={post.id}
                                    photo={post.userProfileImage}
                                    name={post.userName}
                                    date={post.date}
                                    message={post.message}
                                    icon={post.podcastIcon}
                                    title={post.podcastEpisode}
                                    description={post.episodeDescription}
                                    link={post.link}
                                    likes={post.likes}
                                    comments={post.comments}
                                />
                            ))}
                        </Container>
                    ) : (
                            <div className="col">
                                <h5 className="text-center">&nbsp;{this.state.messageNoPodcast}</h5>
                            </div>
                        )}
                </Row>
            </Container>
        )
    }
}

export default Home;