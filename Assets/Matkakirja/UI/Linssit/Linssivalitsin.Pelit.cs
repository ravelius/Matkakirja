// PELIT-KATEGORIA (omistaja 4.10.2026 klo 18.3x Päätoimittajan kautta: "Kehittäjällä pitää olla kaikki minipelit suoraan pelien
// alla. Tee uusi peli kategoria linssien viereen saman napin alle joka on kartan yläreunassa"; Pelikoodari, Natiivi-UI:n kuittaus).
// Kartan Linssit-nappi avaa saman kapean näkymän; ylärivin otsikon tilalla välilehdet LINSSIT | PELIT karttaselitteen pohjalla
// (Kartta.uss .mk-selite__valilehdet / __valilehti, valittu mk-valittu). Kun toinen kategoria on tyhjä, ylärivillä on pelkkä
// otsikko kuten ennen (ei tyhjää näkymää). Pelit-rivit Aarteiden rivipohjalla (mk-linssirivi, osiot mk-linssivalitsin__aarreosio).
//   Kehittäjä (Asetukset.Kehittaja): kaikki minipelit ilman ansaitsemista — Mylly ja Tavli kumpikin yhtenä rivinä, kaikki laudat valintakortissa
//                                     ja Lentopeli (vaihe 1, lähtö pelaajan kaupungista tai Ateenasta).
//   Pelaaja: vain pelatut ja avatut pelit — Mylly kohtaamisen (Berliini) jälkeen yhtenä rivinä (omistaja 4.10.), käytössä olevat laudat
//            valintakortissa. Pelit eivät enää
//            ole Aarteissa (omistaja 18.3x: "Ota pelit pois aarteista"), vaan vain täällä.
using System.Collections.Generic;
using System.Linq;
using Matkakirja.Peli;
using Matkakirja.Peli.Pelit;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed partial class Linssivalitsin
    {
        VisualElement pelit, valilehdet;
        Button valilehtiLinssit, valilehtiPelit;

        static Pelaaja PeliPelaaja => PeliOhjain.Instanssi?.Matka?.Tila.Pelaaja;

        /// <summary>Pelin laudat, jotka saa avata Pelit-näkymästä: kehittäjällä kaikki, pelaajalla kohtaamisen jälkeen käytössä olevat.</summary>
        static List<PeliLauta> PelinLaudat(PeliKuvaus m)
        {
            var p = PeliPelaaja;
            if (Asetukset.Kehittaja) return m.Laudat.ToList();
            if (p == null || !Peliluettelo.Pelattu(p, m.Id)) return new List<PeliLauta>();
            return m.Laudat.Where(l => Peliluettelo.Kaytossa(p, m, l)).ToList();
        }

        /// <summary>Pelit-välilehden lautapelit ja niiden avaus (Tavli 5.10.2026 samalla rivipohjalla kuin Mylly).</summary>
        static readonly (PeliKuvaus Peli, System.Action<string> Avaa)[] Lautapelit =
        {
            (Peliluettelo.Mylly, MyllyNakyma.AvaaPeli),
            (Peliluettelo.Tavli, TavliNakyma.AvaaPeli),
        };

        /// <summary>
        /// KESKENERÄISET VIDEOPELIT (omistaja 8.10. klo 17.4x: "Sen voisi laittaa sitten pelien puolelle ja jättää esittelyn taas
        /// linssien puolelle"; tarkennus "olavin linna pitäisi olla pelien alla, mutta piilossa keskeneräiset valikon alla ja näkyä
        /// vain kehittäjille"): Olavinlinnan pelattava osa Pelit-välilehden KESKENERÄISET-osioon kehittäjätilassa samalla rivipohjalla
        /// kuin lautapelit; Jatka/Alusta tallennuksesta (SeikkailuTapit.AvaaPelattavaPala). Linnakierros jää linsseihin. Valmiina
        /// peli siirtyy omistajan päätöksellä VIDEOPELIT-osioon kaikille (Raamattu KAKSI PELILAJIA).
        /// </summary>
        /// Kuva ja ikoni (omistaja 8.10.2026 klo 19.1x): linnan siluetti ja Codexin 1499-havainnekuva; 21.5x yökuva (yö, sade, usva,
        /// tyhjä vene lyhtyineen, hehkuva portti; Päätoimittaja: erinomainen) uudella polulla 20261008/peli-yo.jpg (1600 × 900).
        static readonly (string Id, string Nimi, string Selite, string Ikoni, string KuvaUrl, System.Action Avaa)[] Keskeneraiset =
        {
            ("olavinlinna", "Olavinlinna", "1499 · koko seikkailu, noin 25 min", "linna",
                "https://media.matkakirja.app/julisteet/olavinlinna-kortti/20261008/peli-yo.jpg", SeikkailuTapit.AvaaPelattavaPala),
        };

        /// <summary>Pelit-kategoriassa on jotain (Karttaselitteen Linssit-nappi näkyy myös ilman linssejä).</summary>
        public static bool PelejaAvattu => Asetukset.Kehittaja || Lautapelit.Any(l => PelinLaudat(l.Peli).Count > 0);

        static bool LinssejaOn => LinssiUi.Rekisteri?.Valittavat.Count > 0;

        void LuoPelit(VisualElement oikea)
        {
            pelit = Rakenne.El("mk-linssivalitsin__aarteet mk-linssivalitsin__pelit", oikea, PickingMode.Ignore);
            pelit.style.display = DisplayStyle.None;
            valilehdet = Rakenne.El("mk-selite__valilehdet", null, PickingMode.Ignore);
            ylarivi.Insert(ylarivi.IndexOf(otsikko), valilehdet);
            valilehtiLinssit = Rakenne.Nappi("LINSSIT", "mk-selite__valilehti", () => NaytaNakyma(Nakyma.Linssit), valilehdet);
            valilehtiPelit = Rakenne.Nappi("PELIT", "mk-selite__valilehti", () => NaytaNakyma(Nakyma.Pelit), valilehdet);
            valilehdet.style.display = DisplayStyle.None;
        }

        /// <summary>Linssit ja Pelit: välilehdet otsikon tilalle, kun molemmissa on sisältöä; muuten pelkkä otsikko.</summary>
        void NaytaValilehdet(Nakyma n)
        {
            bool kumpikin = (n == Nakyma.Linssit || n == Nakyma.Pelit) && LinssejaOn && PelejaAvattu;
            valilehdet.style.display = kumpikin ? DisplayStyle.Flex : DisplayStyle.None;
            otsikko.style.display = kumpikin ? DisplayStyle.None : DisplayStyle.Flex;
            valilehtiLinssit.EnableInClassList("mk-valittu", n == Nakyma.Linssit);
            valilehtiPelit.EnableInClassList("mk-valittu", n == Nakyma.Pelit);
        }

        /// <summary>
        /// Pelivalikko: LAUTAPELIT kaikille (Mylly, Tavli; laudat-laskuri osion otsikossa) ja kehittäjätilassa sen alla KESKENERÄISET
        /// (Olavinlinna 1499, Lentopeli); erillistä VIDEOPELIT-osiota ei vielä ole (omistaja 8.10. 17.4x). Tyhjää osiota ei näytetä.
        /// </summary>
        void RakennaPelit()
        {
            pelit.Clear();
            var lauta = Lautapelit.Select(l => (l.Peli, l.Avaa, Laudat: PelinLaudat(l.Peli))).Where(l => l.Laudat.Count > 0).ToList();
            if (lauta.Count > 0)
            {
                Osio("Lautapelit", lauta.Sum(l => l.Laudat.Count), lauta.Sum(l => l.Peli.Laudat.Length), pelit);
                foreach (var (m, avaa, laudat) in lauta)
                {
                    // Omistaja 4.10. 22.5x: "Mylly saisi näkyä yhtenä pelinä valikossa. Ei kolmena eri lautana" → yksi rivi per peli;
                    // lauta valitaan valintakortin lautavalinnasta (kehittäjällä kaikki laudat auki siellä).
                    AarreRivi("peli:" + m.Id, m.Nimi, null, string.Join(" · ", laudat.Select(l => l.Nimi)),
                        () => { Sulje(); avaa(m.Id); }, pelit, Ikonit.Viiva.TryGetValue(m.Id, out var pk) ? pk : Ikonit.Viiva["noppa"]);
                }
            }
            if (Asetukset.Kehittaja)
            {
                Osio("Keskeneräiset", -1, -1, pelit);
                foreach (var v in Keskeneraiset)
                {
                    var avaa = v.Avaa;
                    AarreRivi("peli:" + v.Id, v.Nimi, v.KuvaUrl, v.Selite, () => { Sulje(); Debug.Log("MATKAKIRJA ui pelit: keskeneräinen " + v.Id); avaa(); }, pelit, Ikonit.Viiva[v.Ikoni]);
                }
                AarreRivi("peli:lentopeli", "Lentopeli", null, null, AloitaLentopeli, pelit, Ikonit.Viiva["lentopeli"]);
            }
            if (lauta.Count == 0 && !Asetukset.Kehittaja)
                Rakenne.Teksti("Ei vielä pelejä.", "mk-linssivalitsin__tyhja", pelit);
        }

        /// <summary>Lentopeli vaihe 1 kuten "lentopeli aloita": lähtö pelaajan kaupungista, jos sillä on kotirengas, muuten Ateenasta.</summary>
        void AloitaLentopeli()
        {
            Sulje();
            var np = KarttaKerrokset.Instanssi != null ? KarttaKerrokset.Instanssi.nappula : null;
            if (np == null) return;
            var p = PeliPelaaja;
            string kaupunki = p != null && p.Sijainti.Kaupungissa ? p.Sijainti.Kaupunki : null;
            bool ok = (kaupunki != null && np.AloitaLentopeli(kaupunki)) || np.AloitaLentopeli("ateena");
            Debug.Log($"MATKAKIRJA ui pelit: lentopeli {(ok ? "aloitettu" : "ei voitu aloittaa")} ({kaupunki ?? "ei kaupunkia"} → {Nappula.LentopeliKuvaus()})");
        }
    }
}
