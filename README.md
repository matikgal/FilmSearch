# CineSnap

CineSnap to aplikacja webowa do wyszukiwania i przeglądania filmów oraz seriali. Aplikacja pobiera dane z API i umożliwia ich przeglądanie za pomocą responsywnego interfejsu użytkownika.

---

## Technologie

- **React** – biblioteka do budowania interfejsów użytkownika
- **TypeScript** – statycznie typowany JavaScript
- **Vite** – szybkie środowisko deweloperskie
- **Tailwind CSS** – narzędzie do szybkiego stylowania
- **React Router DOM** – routing w aplikacjach React
- **React Slick** – slider do wyświetlania treści
- **React Icons** – ikony w aplikacji

---

## Funkcje

- **Responsywny Navbar** – wyszukiwarka, menu oraz autoryzacja (Sign Up / Log In)
- **Przeglądanie filmów i seriali** – oddzielne podstrony dla filmów (/movie) oraz seriali (/tv)
- **Slidery** – prezentacja najnowszych filmów i seriali oraz przegląd kategorii
- **Scroll to Top** – automatyczne przewijanie do góry przy zmianie ścieżki

---

## Instalacja

1. **Sklonuj repozytorium:**

   ```bash
   git clone <adres_repozytorium>
   cd FilmSearch
   Zainstaluj zależności:
   ```

npm install
Uruchom aplikację w trybie deweloperskim:

npm run dev
Konfiguracja API
Aby aplikacja mogła pobierać dane, skonfiguruj plik ApiService (w folderze src/Services) i ustaw swój klucz API (np. z TMDB).

Struktura projektu
src/components – komponenty interfejsu (Navbar, MovieSlider, LatestSlider itp.)
src/pages – podstrony (MoviePage, TvShowPage itp.)
src/hooks – niestandardowe hooki (useNavbar, ScrollToTop)
src/contexts – konteksty globalne (NavbarContext)
src/Services – usługi, np. ApiService
Budowanie projektu
Aby zbudować aplikację do produkcji, uruchom:

npm run build
Licencja
Projekt jest dostępny na licencji MIT (lub inna licencja, jeśli dotyczy).
