// VAHVISTUSDIALOGI (Natiivi-UI, erä 1): verkkopelin #nollaa-dialog -kaava.
// Himmennys rgba(14,9,4,.72) koko ruudun yli (myös turva-alueen ulkopuolelle),
// pergamenttikortti keskellä: otsikko, teksti, napit oikealla
// (.ghost peruuta + .primary vahvista). Himmennyksen napautus = peruuta.
using System;
using UnityEngine;
using UnityEngine.UIElements;

namespace Matkakirja.Natiivi
{
    public sealed class Vahvistus
    {
        readonly VisualElement himmennys;
        readonly Label kapiteeli, otsikko, teksti, korostus;
        readonly Button peru, ok;
        Action vahvistettu;

        public bool Auki { get; private set; }

        public Vahvistus(UiKerros kerros)
        {
            var juuri = kerros.Juuri(UiKerros.Valikot);
            himmennys = Rakenne.El("mk-himmennys mk-himmennys--tumma", juuri);
            himmennys.style.display = DisplayStyle.None;
            // E18: web #nollaa-dialog sulkeutuu vain napeista (tai Escistä), ei taustan napautuksesta.

            // KORTTI-pohja, modaali (web #3793): kapiteeli, otsikko alaviivalla, leipä, korostuskappale, napit oikealle
            // (Peruuta = TOIMINTO, vahvistus = ensisijainen kulta).
            var kortti = new Kortti("mk-vahvistus", pohja: true);
            himmennys.Add(kortti);
            kapiteeli = Rakenne.Teksti("", "mk-kortti__kapiteeli", kortti.Sisus);
            Kirjasimet.Aseta(kapiteeli, Tyylikirja.Kirjain.Kapiteeli);
            otsikko = Rakenne.Teksti("", "mk-kortti__otsikko", kortti.Sisus);
            Kirjasimet.Aseta(otsikko, Tyylikirja.Kirjain.Otsikko);
            teksti = Rakenne.Teksti("", "mk-kortti__teksti", kortti.Sisus);
            korostus = Rakenne.Teksti("", "mk-kortti__teksti mk-kortti__teksti--korostus", kortti.Sisus);
            Kirjasimet.Aseta(korostus, Kirjasin.LukuLihava);
            var napit = Rakenne.El("mk-kortti__napit", kortti.Sisus, PickingMode.Ignore);
            peru = Rakenne.Nappi("Peruuta", "mk-nappi--toiminto", Sulje, napit);
            ok = Rakenne.Nappi("", "mk-nappi--kulta", () => { var v = vahvistettu; Sulje(); v?.Invoke(); }, napit);
            Kirjasimet.Aseta(napit, Kirjasin.Kone);
            Kirjasimet.Aseta(ok, Kirjasin.KoneLihava);
        }

        public void Kysy(string otsikkoTeksti, string leipa, string peruTeksti, string okTeksti, Action kunVahvistettu,
            string kapiteeliTeksti = null, string korostusTeksti = null)
        {
            kapiteeli.text = kapiteeliTeksti ?? "";
            kapiteeli.style.display = string.IsNullOrEmpty(kapiteeliTeksti) ? DisplayStyle.None : DisplayStyle.Flex;
            otsikko.text = otsikkoTeksti;
            teksti.text = leipa;
            korostus.text = korostusTeksti ?? "";
            korostus.style.display = string.IsNullOrEmpty(korostusTeksti) ? DisplayStyle.None : DisplayStyle.Flex;
            peru.Q<Label>(className: "mk-nappi__teksti").text = peruTeksti;
            ok.Q<Label>(className: "mk-nappi__teksti").text = okTeksti;
            vahvistettu = kunVahvistettu;
            Auki = true;
            Rakenne.Nayta(himmennys, true, 320);
            SyoteLukko.Esta(this);
        }

        public void Sulje()
        {
            if (!Auki) return;
            Auki = false;
            vahvistettu = null;
            Rakenne.Nayta(himmennys, false, 250);
            SyoteLukko.Vapauta(this);
        }
    }
}
