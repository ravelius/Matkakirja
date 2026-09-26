namespace Matkakirja
{
    /// <summary>
    /// 3D-symbolinostojen arkkityypit (löydös 160, omistajan linjaus 26.9. kohta 11: sama kirjasto tasoille 1–3). Mallit
    /// ovat Symbolimallit.Arkkityypit.cs:ssä; puuttuva laji → yleinen merkkikivi. Järjestys = mallitaulukon indeksi.
    /// </summary>
    public enum Arkkityyppi
    {
        Merkkikivi, Temppeli, Kirkko, Luostari, Linna, Kaupunginmuuri, Majakka, Silta, Mylly, Satama, Luola, Muistomerkki,
        Raunio, Kaupunkitalo, Vuori,
    }

    /// <summary>Nosto → arkkityyppi -kartoitus (seuraava vaihe); tässä vain arkkityyppien määrä.</summary>
    public static class ArkkityyppiKartoitus
    {
        public const int Lukumaara = (int)Arkkityyppi.Vuori + 1;
    }
}
