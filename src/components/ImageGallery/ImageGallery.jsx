import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import css from '../ImageGallery/ImageGallery.module.css';

const ImageGallery = ({ articles, onImageClick }) => {
  return (
    <ul className={css.image__gallery}>
      {articles.map(({ id, tags, webformatURL }, index) => {
        return (
          <ImageGalleryItem
            key={id}
            index={index}
            tags={tags}
            ImgURL={webformatURL}
            onImageClick={onImageClick}
          />
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  onImageClick: PropTypes.func.isRequired,
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
export default ImageGallery;
