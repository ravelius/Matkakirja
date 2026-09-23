// UI-NÄKYMÄT: natiivin käyttöliittymän kokoaja (Natiivi-UI, erä 1).
//
// Rakentaa yläpalkin (tilarivi, ratas, hampurilainen), pudotuspaneelit,
// vahvistusdialogin ja matkavalinnan UiKerroksen paneeleihin ja kytkee ne
// Pelikoodarin näkymätehtaaseen (PeliNakymat, BeforeSceneLoad), joten
// PeliOhjain käyttää näitä UGUI-varanäkymien sijaan. Näkymät ovat olemassa
// myös ilman pelisilmukkaa (peli pois -tila, 3D-mittaukset).
//
// Pelin teot vain PeliOhjaimen julkisen API:n kautta (RAJAPINTA.md):
// "uusi peli" → PeliOhjain.Instanssi.UusiPeli(null).
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class UiNakymat
    {
        static UiNakymat instanssi;

        /// <summary>Sisältöpaketin versio valikon alariville (PeliOhjain tai Sisalto voi asettaa).</summary>
        public static string SisaltoVersio;

        public readonly UiKerros Kerros;
        public readonly Ylapalkki Tilarivi;
        public readonly Matkavalinta Matkavalinta;
        public readonly Vahvistus Vahvistus;
        public readonly Paavalikko Valikko;
        public readonly Aanentasot Aanentasot;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.BeforeSceneLoad)]
        static void KytkeTehdas()
        {
            PeliNakymat.Tilarivi = _ => Hae().Tilarivi;
            PeliNakymat.MatkaValinta = _ => Hae().Matkavalinta;
        }

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        static void Kaynnista() => Hae();

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.SubsystemRegistration)]
        static void Nollaa() => instanssi = null; // editorin Enter Play Mode ilman domain reloadia

        public static UiNakymat Hae() => instanssi ??= new UiNakymat(UiKerros.Hae());

        UiNakymat(UiKerros kerros)
        {
            instanssi = this;
            Kerros = kerros;
            Tilarivi = new Ylapalkki(kerros);
            Matkavalinta = new Matkavalinta(kerros);
            Vahvistus = new Vahvistus(kerros);
            Valikko = new Paavalikko(kerros, () => Tilarivi.Alareuna, Vahvistus);
            Aanentasot = new Aanentasot(kerros, () => Tilarivi.Alareuna);

            Tilarivi.Valikko.clicked += () => { Aanentasot.Sulje(); Valikko.Vaihda(); };
            Tilarivi.Ratas.clicked += () => { Valikko.Sulje(); Aanentasot.Vaihda(); };
            Valikko.AukiMuuttui += auki => Tilarivi.Valikko.EnableInClassList("mk-valittu", auki);
            Aanentasot.AukiMuuttui += auki => Tilarivi.Ratas.EnableInClassList("mk-valittu", auki);
            Valikko.UusiPeli += () =>
            {
                var o = PeliOhjain.Instanssi;
                if (o != null) o.UusiPeli(null);
                else Tilarivi.Viesti("Peli ei ole vielä käynnissä");
            };
        }

        public void SuljeKaikki()
        {
            Valikko.Sulje();
            Aanentasot.Sulje();
            Vahvistus.Sulje();
            Matkavalinta.Piilota();
            Matkavalinta.PiilotaHeitto();
        }

        /// <summary>Testikomento 'ui matka': esimerkkivalinta ilman peliä.</summary>
        public void Esimerkkimatka()
        {
            Matkavalinta.Nayta("Lontoo", "300 £ · päivä 1 · aamu", new[]
            {
                ("Bussi", "50 £ · perillä heti, aika ei kulu"),
                ("Lento", "300 £ · perillä, vie vuoron"),
                ("Liftaus", "ilmainen · noppa · 4 askelta perille"),
                ("Laiva", "100 £ · noppa · 6 askelta perille"),
            }, i => { Matkavalinta.Piilota(); Tilarivi.Viesti("Valittu: " + i); }, () => Tilarivi.Viesti("Peruttu"));
        }
    }
}
