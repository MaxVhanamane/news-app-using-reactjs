import React, { Component } from 'react'
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';
// Adding external InfiniteScroll component to add infinite scrolling to the page.
import InfiniteScroll from "react-infinite-scroll-component";
export default class News extends Component {
    // Adding default props
    static defaultProps = {
        country: 'in',
        pageSize: 15
    }

    // Adding prop types
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }


    constructor() {
        super();
        this.state = {
            articles: [],
            page: 1,
            loading: true,  // setting loading: true so that it can show spinner when web app starts.
            totalResults: 0
        }
    }

    // Adding a function to capitalize first letter of news heading (h1) and title.
    capitalize = s => s && s[0].toUpperCase() + s.slice(1)
    // creating updateNews function to get news from news api
    async updateNews() {
        // Changing title as category changes
        document.title = `${this.capitalize(this.props.category)} - DailyDose`
        // this.props.setProgress(10) this used to set progress value for top loading bar.
        this.props.setProgress(10)
        // url to get news from news api using api key
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        // here pageSize is the number of results to return per page. To understand this read https://newsapi.org documentation.
        // page - Use this to page through the results.

        // data will be received in object form
        let data = await fetch(url)
        this.props.setProgress(50)
        // parsing the received data
        let parsedData = await data.json()
        this.props.setProgress(75)
        // Adding required data to the state
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, // as we have received the data so there is no need to show the spinner anymore.
        })
        this.props.setProgress(100)
    }

    componentDidMount() {
        this.updateNews()
    }

    // This function is required by the InfiniteScroll component
    fetchMoreData = () => {

        this.setState({
            page: this.state.page + 1
        }, async () => {
            // Adding this code to setState's callback function so that it can use the updated value of page i.e (page: this.state.page + 1)
            // if I write this code outside the callback function it won't use latest value of page which we have set above using setState function it will use the old
            // value. as we are using await in our code we have to make our callback function async.
            let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`

            let data = await fetch(url)
            let parsedData = await data.json()
            // here concatinating the old articles to the new articles so that I can show all the news on a single page with infinite scolling 
            this.setState({
                articles: this.state.articles.concat(parsedData.articles),
                totalResults: parsedData.totalResults,
            })

        })

    };
    render() {
        return (
            <>
                <div className="container my-4">
                    <h1 className="text-center my-4">Top {this.capitalize(this.props.category)} News</h1>
                    {this.state.loading && <Spinner />}

                    {/* to use InfiniteScroll wrap the map function in InfiniteScroll component  
                        read the documentation for better understanding*/}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults} //Check whether the next set of news is available or not.
                        loader={<Spinner />}  // This will be shown when data is loading
                    >
                        <div className="container">
                            <div className="row my-3">
                                {this.state.articles.map((element) => {
                                    return <div key={uuidv4()} className="col-md-4">
                                        < NewsItem title={element.title ? element.title : "No title"} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>

                </div>

            </>
        )
    }
}
