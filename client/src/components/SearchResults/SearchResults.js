import React, { Component } from "react";
import List from "../List/list";
import Podcast from "../Podcast/podcast";
import Container from "../Container/container";
import "./searchResults.css";

// SEARCH RESULTS COMPONENT

function SearchResults ({ show, podcasts, handler }) {

    return (
        <Container>
            <div className={show}>
                <List>
                    {podcasts.map((podcast) =>
                        <Podcast 
                          key={podcast.id}
                          podcastId={podcast.id}
                          podcastLogo={podcast.image}
                          thumbnail={podcast.thumbnail}
                          title={podcast.title_original}
                          handler={handler}
                        />
                    )}                
                </List>
            </div>
        </Container>
        )
};

export default SearchResults;



