import React, { Component } from 'react'
import NewsItem from "./NewsItem"
import Spinner from "./Spinner"
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid';
export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 15
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number
    }


    constructor() {
        super();
        // Don't call this.setState() here!
        this.state = {
            articles: [],
            page: 1,
            loading: false,
        }
    }
    async updateNews() {
        console.log("mount begi",this.state.page)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({
            loading: true
        })

        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        console.log("articles", parsedData.articles.length)
        this.setState({
            articles:parsedData.articles ,
            totalResults: parsedData.totalResults,
            loading: false, 
            
        },()=>{
             console.log("totalResults",this.state.totalResults)
        })
        console.log("mount end",this.state.page)
        console.log("totalResults",this.state.totalResults)

    }

    async componentDidMount() {
        this.updateNews()
    }

    handleNextAndPrevClick = async (e) => {
        if (e.target.name === "next") {

            this.setState({
                page: this.state.page + 1
            },()=>{
                this.updateNews()
            })
            
            

        }

        else {
            this.setState({
                page: this.state.page - 1
            },()=>{
                this.updateNews()
            })

        }
    }

    render() {
        return (
            <>
                <div className="container my-4">
                    <h1 className="text-center">Top News</h1>
                    {this.state.loading && <Spinner />}

                    <div className="row my-3">
                        {!this.state.loading && this.state.articles.map((element) => {
                            return <div key={uuidv4()} className="col-md-4">
                                < NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} url={element.url} author={element.author} time={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>

                </div>

                <div className=" container d-flex justify-content-between mb-3">
                    <button name="previous" disabled={this.state.page <= 1} type="button" onClick={this.handleNextAndPrevClick} className="btn btn-sm btn-dark"> &larr; Previous</button>
                    <button name="next" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNextAndPrevClick} className="btn btn-sm btn-dark"> Next &rarr;</button>
                </div>
            </>
        )
    }
}
