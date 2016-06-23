import React, { Component } from 'react'
import Logo from '../Logo'
import Appell from '../Appell'
import TextHighlight from '../TextHighlight'
import Button from '../Button'
import fetch from '../../services/fetch'
import styles from './styles.css'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false,
      date: null,
      link: null,
      location: null,
      street: null
    }
  }

  componentDidMount() {
    fetch('https://jsonp.afeld.me/?url=https%3A%2F%2Fapi.meetup.com%2Fhannoverjs%2Fevents%3Fphoto-host%3Dpublic%26page%3D1%26sig_id%3D193357699%26sig%3D1984d695155f4559b3c8fb5d49b7a7e13ac89936')
      .then(res => {
        const {
          time,
          link,
          venue: {
            address_1,
            name
          }
        } = res[0]
        this.setState({
          loading: false,
          date: time,
          link,
          location: name,
          street: address_1
        })
      })
    .catch(() => {
      this.setState({ loading: false, error: true })
    })
  }

  renderClaim() {
    return (
      <h1 className={styles.claim}>
        Hannover's monthly<br />JavaScript Meetup
      </h1>
    )
  }

  renderDate() {
    let date = new Date(this.state.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    })
    return <TextHighlight text={date} />
  }

  renderButton() {
    return (
      <Button className={styles.button} href={this.state.link} large>
        RSVP & Join us on Meetup
      </Button>
    )
  }

  render() {
    return (
      <div className={styles.root}>
        <Logo className={styles.logo} />
        <div
          className={styles.content}
          style={{ opacity: !this.state.loading ? 1 : 0 }}
        >
          {!this.state.loading && (
            <div className={styles.info}>
              {this.renderClaim()}
              <Appell />
              {!this.state.error && (
                <div className={styles.date}>
                  Next Meetup on {this.renderDate()}
                </div>
              )}
              <Button
                className={styles.button}
                href={this.state.link || 'http://www.meetup.com/HannoverJS/'}
                large
              >
                RSVP & Join us on Meetup
              </Button>
            </div>
          )}
        </div>
      </div>
    )
  }
}