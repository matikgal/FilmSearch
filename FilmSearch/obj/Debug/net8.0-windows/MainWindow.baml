   M S B A M L   `   `   `  ����  
FilmSearch    MovieSearchWPF.MainWindow   5   	   W SPresentationCore, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35\ XPresentationFramework, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089R NWindowsBase, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35^ ZWindowsFormsIntegration, Version=8.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35H 9http://schemas.microsoft.com/winfx/2006/xaml/presentation      R NSystem.Xaml, Version=8.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     5   	   @d2http://schemas.microsoft.com/expression/blend/2008     5   	   Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     5   	   A =Wpf.Ui, Version=3.0.1.0, Culture=neutral, PublicKeyToken=null/ui&http://schemas.lepo.co/wpfui/2022/xaml  5   	   $	��720��5   	   $	��920��5	   	   $	��920��5
   	   $	��570��5   	     � WindowStyle$
  None=�5   	    � 
ResizeMode$ CanResizeWithGrip=�5   	   
������  � AllowsTransparency$
 True��5   	    � WindowStartupLocation$ CenterScreen=�6#   .��5      �� ���#3a3b3a �� CornerRadius$ 10��6"   ._�5   
   �  � ColumnDefinitions 5      �� 5      $	��200 �6#   �� 5       � RowDefinitions 5      �� 5      $��75 �6    �� 5      .+�5      �� $��Nazwa��6   $��Center=�5      $
��Left=�5       
�������$��22(�5"      $��20,0,0,0q�5#      �� 5%      $��1��6   .+�5'      	� -   5         	�Name$ Movies��5'      $��Movies��6.   $��50��5(      
�������$��14(�5*         MenuButtonTheme#��[  5+      	� 5-      -   5        $ TV_Shows��5-      $��TV Shows��60   $��50��5.      
�������$��14(�50      #��[  51      	� 53      -   5        $ Top_Rated_Movies��53      $��Top Rated Movies��68   $��50��54      
�������$��14(�56      #��[  57      	� 59      -   5        $ Top_Rated_TV_Shows��59      $��Top Rated TV Shows��6:   $��50��5:      
�������$��14(�5<      #��[  5=      �� 5B      $��20,0,0,0q�6   .+�5C      �� $��Sort By��6      SortByTextBlock#��[ 6/   �� 5D      .+�5E      �� $��Votes��6#     SortByCheckBox#��[ 63   �� 5F      $��Votes��6#   #��[ 63   5G      �� 5H      $��Genre��6    #��[ 6-   �� 5I      .+�5J      �� $��CheckBox��6#   #��[ 66   �� 5K      $��CheckBox��6#   #��[ 66   5L      �� 5M      $
��Year��6    #��[ 6,   �� 5N      .+�5O      �� $��CheckBox��6#   #��[ 66   �� 5P      $��CheckBox��6#   #��[ 66   5Q      5R      5T      �� 5V      -   5         ��Name$ 	SearchBox��5V      $��1��5W      $
��Left=�5X      	 �� TextWrapping$
	 Wrap=�5Y      $��Center=�5Z      $	��200��5[      $��40��6"     ModernTextbox#��[ 5\      $��10,0,0,0q�5^      �� 5a      -   5        
 ��Name$
 
ContentBox��5a        ContentBoxStyle#��[ 61   $��1��6Z   $��10,10,10,10q�6j   $��1��6   .��5b      �� $
	 Wrap=�6   $��TextBox��6.   $	��120��6=   5c      �� 5e      -   5        $
 ContentBox_Description��5e      $��1��6=   $��476,10,10,10q�6M   $��1��6c   A� 5g      -   5         A�Name$
 Exit��5g        ExitButtonStyle#��[ 6$   5h      A� 5i      -	   5        $ MaxMin��5i        MaxMinButtonStyle#��[ 6&   5j      A� 5k      -
   5        $
 Hide��5k        HideButtonStyle#��[ 6$   5l      5q      5r      5s      