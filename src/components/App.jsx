import { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'api/api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Notification from './Notification/Notificatiom';

class App extends Component {
  state = {
    webformatURL: '',
    largeImageURL: '',
    searchQuery: '',
    page: 1,
    showModal: false,
    loading: false,
    articles: [],
    totalHits: 0,
    alt: '',
    error: null,
    tags: '',
  };
  async componentDidUpdate(_, prevState) {
    const searchQuery = this.state.searchQuery;
    const page = this.state.page;

    if (searchQuery !== prevState.searchQuery || page !== prevState.page) {
      try {
        this.setState({ loading: true });
        const imageData = await fetchImages(searchQuery, page);

        const imagesHits = imageData.hits;

        if (imagesHits.length === 0) {
          Notify.failure('No results were found, please try something else.');
          return;
        }

        this.setState(({ articles }) => ({
          articles: [...articles, ...imagesHits],
          totalHits: imageData.totalHits,
        }));
      } catch (error) {
        this.setState({
          error: Notify.failure(`Sorry something went wrong. ${error.message}`),
        });

        Notify.failure(`Sorry something went wrong. ${error.message}`);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  handleLoadMore = e => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  handleFormSubmit = text => {
    this.setState({ searchQuery:  text.trim(), page: 1, articles: []});
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  handleImageClick = index => {
    this.toggleModal();
    this.setState({
      largeImageURL: this.state.articles[index].largeImageURL,
      tags: this.state.articles[index].tags,
    });
  };

  render() {
    const { showModal, articles, error, loading } = this.state;
    const imagesCount = articles.length;
    return (
      <>
        <div>
          <Searchbar onSubmit={this.handleFormSubmit} />
          {loading && <Loader />}
  
          {error && (
            <p style={{ color: 'grey', textAlign: 'center' }}>
              {error.message}
            </p>
          )}
          {imagesCount > 0 && (
            <ImageGallery
              articles={articles}
              onImageClick={this.handleImageClick}
            />
          )}
          {imagesCount > 0 && imagesCount !== this.state.totalHits && (
            <Button loadMore={this.handleLoadMore} />
          )}
          {imagesCount > 0 && imagesCount === this.state.totalHits && (
            <Notification />
          )}
        </div>

        <div>
          {showModal && (
            <Modal onClose={this.toggleModal}>
              {<img src={this.state.largeImageURL} alt={this.state.tags} />}
            </Modal>
          )}       
        </div>
      </>
    );
  }
}
export default App;


