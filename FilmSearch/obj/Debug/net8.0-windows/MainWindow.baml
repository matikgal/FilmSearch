   M S B A M L   `   `   `  ����  
FilmSearch    MovieSearchWPF.MainWindow   5      W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35F 9http://schemas.microsoft.com/winfx/2006/xaml/presentation     R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5      @d2http://schemas.microsoft.com/expression/blend/2008     5      Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5      $	��720��5      $	��920��5      $	��920��5	      $	��570��5
        � WindowStyle$
  None=�5       � 
ResizeMode$ CanResizeWithGrip=�5      
������  � AllowsTransparency$
 True��5       � WindowStartupLocation$ CenterScreen=�6   .��5      �� ���#1e1c19 �� CornerRadius$ 10��6"   ._�5   
   �  � Cursor$  ��6    � ColumnDefinitions 5      �� 5      $	��200 �6#   �� 5       � RowDefinitions 5      �� 5      $��75 �6    �� 5      .+�5       �� $��1��6   .+�5!      	� -   5         	�Name$ Movies��5!      $��Movies��6.      MenuButtonTheme#��[  6V   	� 5"      -   5        $ TV_Shows��5"      $��TV Shows��60   #��[  6Z   	� 5#      -   5        $ Top_Rated_Movies��5#      $��Top Rated Movies��68   #��[  6j   	� 5$      -   5        $ Top_Rated_TV_Shows��5$      $��Top Rated TV Shows��6:   #��[  6n   5%      �� 5(      $��1��6   $	��Top=�6&   $��	0,220,0,0q�6>   $	��425��6Q   .+�5)      �� $��Genere��6     FiltresTextStyle#��[ 6*   �� 5*      $��0��6   $	��Top=�6/   $��
10,10,0,20q�6G   $	��300��6[   .��5+      �� 	 �� Orientation$	 Vertical=�6!   .+�5,      �� -   5        
 ��Name$
 ActionCheckBox��5,   #   $��Action��6;     CheckBoxStyle#��[ 6�   �� 5-      -   5        $
 AdventureCheckBox��5-   #   $��	Adventure��6>   #��[ 6�   �� 5.      -   5        $
 AnimationCheckBox��5.   #   $��	Animation��6>   #��[ 6�   �� 5/      -   5        $
 ComedyCheckBox��5/   #   $��Comedy��6;   #��[ 6�   �� 50      -	   5        $
 CrimeCheckBox��50   #   $��Crime��6:   #��[ 6�   �� 51      -
   5        $
 DocumentaryCheckBox��51   #   $��Documentary��6@   #��[ 6�   �� 52      -   5        $
 DramaCheckBox��52   #   $��Drama��6:   #��[ 6�   �� 53      -   5        $
 FamilyCheckBox��53   #   $��Family��6;   #��[ 6�   �� 54      -   5        $
 FantasyCheckBox��54   #   $��Fantasy��6<   #��[ 6�   �� 55      -   5        $
 HistoryCheckBox��55   #   $��History��6<   #��[ 6�   �� 56      -   5        $
 HorrorCheckBox��56   #   $��Horror��6;   #��[ 6�   �� 57      -   5        $
 MusicCheckBox��57   #   $��Music��6:   #��[ 6�   �� 58      -   5        $
 MysteryCheckBox��58   #   $��Mystery��6<   #��[ 6�   �� 59      -   5        $
 RomanceCheckBox��59   #   $��Romance��6<   #��[ 6�   �� 5:      -   5        $
 ScienceFictionCheckBox��5:   #   $��Science Fiction��6C   #��[ 6�   �� 5;      -   5        $
 ThrillerCheckBox��5;   #   $��Thriller��6=   #��[ 6�   �� 5<      -   5        $
 WesternCheckBox��5<   #   $��Western��6<   #��[ 6�   5=      5>      �� 5?      -   5        $��Clear All Categories��5?      $��10,0,0,0q�6_     ButtonStyle#��[ 6q   5@      �� 5C      -   5         ��Name$ 	SearchBox��5C        ModernTextbox#��[ 5D      $��1��5E   :   $  ��6J   �� 5I      $��0,0,0,70q�6   $��1��6-   $��1��6=   $��Visible=�6J   .��5J      �� $  ��6D   ��6   �� *MoviePosters+��5K      �� 5L      .R�5M      �  K� IsItemsHost$
 True��6(   5N      ��5P      �� 5Q      .R�5R      �� -   5          RoundedBorderStyle#��[ 5R   %   
������ $
 Hand��6k   
 � Tag 5S   O   �� ._�5T   "   � .+�5U   &   ��   MoviePosterImageStyle#��[ 6,   $	��250��6y   $	��175��6�   ��6[   �� *
PosterPath+6�   5V   #   5W      5X      5Z      5[      �� 5^      $��1��6   $��1��6&   $	 
Horizontal=�66   $��Center=�6O   $��Bottom=�6l   $��	0,0,40,10q�6�   .+�5_      �� -   5         ��Name$ PreviousPageButton��5_      $��Previous Page��65     CustomButtonStyle#��[ 6n   $��5q�6�   �� 5`      -   5        $ NextPageButton��5`      $��	Next Page��61   #��[ 6b   $��5q�6�   5a      �� 5d      -   5         ��Name$ MovieDetailsBorder��5d   @     CommonBorderStyle#��[ 6   ._�5e      �� $��10q�6   .+�5f      �� -   5         ��Name$ MovieTitleTextBlock��5f   N    	 CommonTextBlockStyle#��[	 6    $
��Bold"�6k   $��18(�6}   �� 5g      -   5        $ MovieDescriptionTextBlock��5g   N   #��[	 6    $��0,5,0,0q�6q   �� 5h      -   5        $ MovieRatingTextBlock��5h   N   #��[	 6    $
��Bold"�6l   $��0,5,0,0q�6~   5i      5j      �� 5k      -   5        $ 
BackButton��5k   @    
 CommonButtonStyle#��[
 6   $
 Hand��6m   � 5n      $��1��6   $��0��6#   .+�5o      A� -    5         A�Name$
 Exit��5o        ExitButtonStyle#��[ 6(   6Q   A� 5p      -!   5        $ MaxMin��5p        MaxMinButtonStyle#��[ 6*   6U   A� 5q      -"   5        $
 Hide��5q        HideButtonStyle#��[ 6(   6Q   5r      5s      5t      5u      