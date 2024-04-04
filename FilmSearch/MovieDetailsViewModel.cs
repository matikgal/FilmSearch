using static MovieSearchWPF.MainWindow;
using System.ComponentModel;

namespace FilmSearch
{
    public class MovieDetailsViewModel : INotifyPropertyChanged
    {
        private MoviePoster _selectedMovie;

        public MoviePoster SelectedMovie
        {
            get { return _selectedMovie; }
            set
            {
                _selectedMovie = value;
                OnPropertyChanged(nameof(SelectedMovie));
            }
        }

        public MovieDetailsViewModel(MoviePoster selectedMovie)
        {
            SelectedMovie = selectedMovie;
        }

        public event PropertyChangedEventHandler PropertyChanged;

        protected virtual void OnPropertyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
