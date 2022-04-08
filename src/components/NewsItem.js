import React, { Component } from 'react'

export default class NewsItem extends Component {

    render() {

        return (


            <div className="card row-md-4 m-2" style={{ width: "18rem" }}>
                <img src={this.props.imageUrl ? this.props.imageUrl : "https://media4.s-nbcnews.com/i/newscms/2019_01/2705191/nbc-social-default_b6fa4fef0d31ca7e8bc7ff6d117ca9f4.png"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"> {this.props.title}</h5>
                    <p className="card-text">{this.props.description}</p>
                    <p className="card-text"><small className="text-muted">{this.props.source} <strong>&#183;</strong> By {this.props.author? this.props.author:"Unknown"} on {this.props.time}</small></p>
                    <a href={this.props.url} className="btn btn-primary">Go somewhere</a>
                </div>
            </div>

        )
    }
}
