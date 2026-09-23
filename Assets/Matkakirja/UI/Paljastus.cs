// AARTEEN PALJASTUS (Natiivi-UI, Fablen B4): webin js/ui.js rakennaPaljastus /
// playTokenReveal ja css .reveal-* — koko ruudun hetki, kun laatan alta löytyy aarre.
//
//   pääaarre (star)   TUMMA: yömusta (#0b0805), yläpuolella "AARNIN LUETTELO" ja
//                     "UNOHDETTU AARRE", aarteen kuva kasvaa esiin (0,9 s), nimi,
//                     palkkiorivi ja fakta, alla arvo ja punainen leima "LÖYDETTY · pv · kk".
//   muut aarteet      PERGAMENTTI (paikallisaarre): vaalea paperi (#e6d8ae + rae), kuva,
//                     nimi, palkkio, fakta tummalla musteella. Ei diplomia (Fable).
// "Jatka matkaa" (tai napautus mihin tahansa) sulkee ja palaa tulosruutuun.
// Pieni liike: ei kasvua eikä viiveitä. Kaanon: pääaarteella ei tähteä (kuva tai kätköarkku).
using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Paljastus
    {
        static readonly string[] Kuut = { "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII" };

        readonly VisualElement kerros, tunnus, kuva, kuvapaikka, loyto;
        readonly Label nimi, palkkio, fakta, arvo, leima;
        readonly Button jatka;
        Action suljettu;
        int versio;

        public bool Auki { get; private set; }

        public Paljastus(UiKerros ui)
        {
            kerros = Rakenne.El("mk-paljastus", ui.Juuri(UiKerros.Valikot));
            kerros.style.display = DisplayStyle.None;
            kerros.RegisterCallback<PointerDownEvent>(_ => Sulje());
            var scene = Rakenne.El("mk-paljastus__scene", kerros, PickingMode.Ignore);

            tunnus = Rakenne.El("mk-paljastus__tunnus", scene, PickingMode.Ignore);
            Kirjasimet.Aseta(Rakenne.Teksti("AARNIN LUETTELO", "mk-paljastus__otsake", tunnus), Kirjasin.KoneLihava);
            Rakenne.Tausta(Rakenne.El("mk-paljastus__viiva", tunnus, PickingMode.Ignore),
                Kuviot.Vaaka("paljastus-viiva", Kuviot.Vari("#e8c98a", 0f), Kuviot.Vari("#e8c98a", 0.72f)));
            Kirjasimet.Aseta(Rakenne.Teksti("UNOHDETTU AARRE", "mk-paljastus__alaotsake", tunnus), Kirjasin.Kone);

            kuvapaikka = Rakenne.El("mk-paljastus__kuvapaikka", scene, PickingMode.Ignore);
            kuva = Rakenne.El("mk-paljastus__kuva", kuvapaikka, PickingMode.Ignore);
            Rakenne.Tausta(Rakenne.El("mk-paljastus__reuna", kuvapaikka, PickingMode.Ignore), Kuviot.Vinjetti);

            var caption = Rakenne.El("mk-paljastus__caption", scene, PickingMode.Ignore);
            nimi = Rakenne.Teksti("", "mk-paljastus__nimi", caption);
            Kirjasimet.Aseta(nimi, Kirjasin.LukuLihava);
            palkkio = Rakenne.Teksti("", "mk-paljastus__palkkio", caption);
            Kirjasimet.Aseta(palkkio, Kirjasin.Luku);
            fakta = Rakenne.Teksti("", "mk-paljastus__fakta", caption);
            Kirjasimet.Aseta(fakta, Kirjasin.LukuKursiivi);

            loyto = Rakenne.El("mk-paljastus__loyto", scene, PickingMode.Ignore);
            arvo = Rakenne.Teksti("", "mk-paljastus__arvo", loyto);
            Kirjasimet.Aseta(arvo, Kirjasin.Kone);
            leima = Rakenne.Teksti("", "mk-paljastus__leima", loyto);
            Kirjasimet.Aseta(leima, Kirjasin.KoneLihava);

            jatka = Rakenne.Nappi("JATKA MATKAA", "mk-paljastus__jatka", Sulje, scene);
            Kirjasimet.Aseta(jatka, Kirjasin.KoneLihava);
        }

        static bool Aarre(string tyyppi) => tyyppi == "star" || tyyppi == "pieniAarre" || tyyppi == "isoAarre" || tyyppi == "mannerAarre";

        /// <summary>Paljastetaanko tämä löytö (aarretyyppi ja oikea vastaus)?</summary>
        public static bool Kuuluu(KysymysNaytto d) => d != null && d.Oikein && Aarre(d.LoytoTyyppi);

        /// <summary>
        /// Näyttää paljastuksen kysymyksen löydöstä. Palkkiorivi luetaan Loyto-tekstistä
        /// ("Löysit: X · +180 £" → "+180 £"). valmis kutsutaan suljettaessa.
        /// </summary>
        public void Nayta(KysymysNaytto d, Action valmis = null)
        {
            suljettu = valmis;
            bool paa = d.LoytoTyyppi == "star";
            kerros.EnableInClassList("mk-paljastus--paikallis", !paa);
            tunnus.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;
            loyto.style.display = paa ? DisplayStyle.Flex : DisplayStyle.None;

            nimi.text = d.LoytoNimi ?? "";
            string rivi = null;
            if (!string.IsNullOrEmpty(d.Loyto))
            {
                int i = d.Loyto.IndexOf(" · ", StringComparison.Ordinal);
                rivi = i >= 0 ? d.Loyto.Substring(i + 3).Split('\n')[0] : null;
            }
            palkkio.text = rivi ?? "";
            palkkio.style.display = string.IsNullOrEmpty(rivi) ? DisplayStyle.None : DisplayStyle.Flex;
            fakta.text = d.LoytoFakta ?? "";
            fakta.style.display = string.IsNullOrEmpty(d.LoytoFakta) ? DisplayStyle.None : DisplayStyle.Flex;
            var nyt = DateTime.Now;
            arvo.text = string.IsNullOrEmpty(rivi) ? "" : "ARVO " + rivi.Replace("+", "").ToUpperInvariant();
            arvo.style.display = string.IsNullOrEmpty(arvo.text) ? DisplayStyle.None : DisplayStyle.Flex;
            leima.text = $"LÖYDETTY\n{nyt.Day} · {Kuut[nyt.Month - 1]}";

            int v = ++versio;
            kuva.style.backgroundImage = StyleKeyword.None;
            var laatta = kuvapaikka.Q<LaattaIkoni>();
            laatta?.RemoveFromHierarchy();
            if (!string.IsNullOrEmpty(d.LoytoKuvaUrl))
                Kuvat.Hae(d.LoytoKuvaUrl, t =>
                {
                    if (v != versio) return;
                    if (t != null) kuva.style.backgroundImage = new StyleBackground(t);
                    else Vara(d);
                });
            else Vara(d);

            bool liike = !LinssiUi.VahennettyLiike();
            kerros.style.display = DisplayStyle.Flex;
            kerros.RemoveFromClassList("mk-auki");
            kerros.RemoveFromClassList("mk-nakyy");
            kerros.schedule.Execute(() => { if (v == versio) kerros.AddToClassList("mk-auki"); });
            // Kuva ensin, sitten teksti ja leima, lopuksi Jatka (web odota-ketju).
            kerros.schedule.Execute(() => { if (v == versio) kerros.AddToClassList("mk-nakyy"); }).StartingIn(liike ? 700 : 0);
            jatka.style.opacity = 0f;
            jatka.schedule.Execute(() => { if (v == versio) jatka.style.opacity = 1f; }).StartingIn(liike ? 1300 : 0);
            Auki = true;
            SyoteLukko.Esta(this);
        }

        void Vara(KysymysNaytto d)
        {
            // Ei kuvaa: sama piirros kuin tulosruudussa (kätköarkku, ei tähteä).
            var ikoni = new LaattaIkoni(d.LoytoTyyppi == "star" ? "isoAarre" : d.LoytoTyyppi);
            ikoni.AddToClassList("mk-paljastus__varaikoni");
            kuvapaikka.Add(ikoni);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            versio++;
            kerros.RemoveFromClassList("mk-auki");
            kerros.schedule.Execute(() => { if (!Auki) kerros.style.display = DisplayStyle.None; }).StartingIn(300);
            SyoteLukko.Vapauta(this);
            var s = suljettu;
            suljettu = null;
            s?.Invoke();
        }
    }
}
