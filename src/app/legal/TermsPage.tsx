import SiteHeader from "@/components/site-header/SiteHeader";
import FilmsFooter from "@/components/films-footer/FilmsFooter";
import "./TermsPage.scss";
import { ActionLink } from "@/components/action/Action";
import FilmsPageContent from "@/components/films-page-content/FilmsPageContent";

const TermsPage = () => (
  <main className="legal-page" id="main-content">
    <SiteHeader universe="films" />
    <FilmsPageContent
      backTo="/"
      backLabel="Retour à l’accueil"
      className="legal-page__content"
    >
      <header>
        <p className="legal-page__eyebrow">
          FERD FILMS · Informations contractuelles
        </p>
        <h1>Conditions générales de vente</h1>
        <p>Dernière mise à jour : 19 août 2026</p>
      </header>

      <section>
        <h2>1. Identification du prestataire</h2>
        <p>
          FERD FILMS est exploité par Ferdinand Goor, entrepreneur individuel,
          domicilié 173 chemin du Printemps, 44800 Saint-Herblain, France. SIRET
          : 884 098 922 00021. Contact : ferdofficial@gmail.com — +33 6 51 60 96
          66.
        </p>
      </section>
      <section>
        <h2>2. Objet et champ d’application</h2>
        <p>
          Les présentes conditions encadrent les prestations audiovisuelles
          proposées par FERD FILMS, notamment la conception, la préparation, la
          réalisation, le tournage et la post-production de clips musicaux.
          Elles s’appliquent avec le devis accepté par le client. En cas de
          contradiction, les conditions particulières du devis prévalent.
        </p>
      </section>
      <section>
        <h2>3. Devis et commande</h2>
        <p>
          Chaque projet fait l’objet d’un devis décrivant son périmètre, ses
          livrables, son calendrier prévisionnel, son prix et les frais
          éventuels. La commande devient ferme après acceptation écrite du devis
          et, lorsqu’il est prévu, encaissement de l’acompte. Toute prestation
          absente du devis initial fait l’objet d’un accord complémentaire.
        </p>
      </section>
      <section>
        <h2>4. Prix et paiement</h2>
        <p>
          Les prix sont exprimés en euros. TVA non applicable, article 293 B du
          Code général des impôts. Sauf échéancier différent indiqué au devis,
          les factures sont payables à réception. Les locations, déplacements,
          décors, lieux, comédiens, techniciens ou matériels spécifiques sont
          facturés séparément lorsqu’ils ne sont pas inclus. Pour les clients
          professionnels, tout retard entraîne une pénalité calculée sur la base
          de trois fois le taux d’intérêt légal et l’indemnité forfaitaire
          légale de 40 € pour frais de recouvrement. Aucun escompte n’est
          accordé en cas de paiement anticipé.
        </p>
      </section>
      <section>
        <h2>5. Collaboration du client</h2>
        <p>
          Le client transmet dans les délais convenus les éléments nécessaires
          au projet et garantit disposer des droits et autorisations utiles sur
          la musique, les marques, les personnes, les lieux et les contenus
          fournis. Un retard ou une absence de validation du client peut décaler
          le calendrier de livraison.
        </p>
      </section>
      <section>
        <h2>6. Préproduction et tournage</h2>
        <p>
          Les intentions créatives, lieux, besoins techniques, planning et
          équipe sont définis selon le budget accepté. Les modifications
          importantes demandées après validation de la préproduction peuvent
          nécessiter un nouveau devis. En cas d’aléa extérieur — météo,
          indisponibilité d’un lieu, incident technique ou force majeure — les
          parties recherchent de bonne foi une nouvelle organisation.
        </p>
      </section>
      <section>
        <h2>7. Annulation et report</h2>
        <p>
          Toute demande d’annulation ou de report doit être communiquée au plus
          tôt. Les prestations déjà réalisées et les dépenses engagées auprès de
          tiers restent dues. Les conséquences financières complémentaires sont
          précisées dans le devis selon la nature et le calendrier du projet.
        </p>
      </section>
      <section>
        <h2>8. Post-production et retours</h2>
        <p>
          Le nombre de séries de retours incluses et les étapes de validation
          sont précisés au devis. Les retours doivent être regroupés, clairs et
          transmis par l’interlocuteur désigné. Les demandes supplémentaires,
          changements de direction après validation ou nouvelles versions
          peuvent être facturés en complément.
        </p>
      </section>
      <section>
        <h2>9. Livraison, conservation et rushes</h2>
        <p>
          Les formats et modalités de livraison sont définis au devis. Sauf
          mention contraire, les rushes, fichiers de projet et éléments de
          travail ne font pas partie des livrables. Leur remise ou leur
          conservation prolongée peut faire l’objet d’un accord et d’une
          facturation spécifiques. Le client est responsable de l’archivage des
          fichiers livrés.
        </p>
      </section>
      <section>
        <h2>10. Propriété intellectuelle</h2>
        <p>
          Les droits d’utilisation concédés au client — supports, territoires,
          durée et finalités — sont précisés au devis et prennent effet après
          paiement intégral. FERD FILMS conserve ses méthodes, outils et
          éléments antérieurs au projet. Sauf refus écrit convenu avant la
          commande, FERD FILMS peut présenter des extraits du projet dans son
          portfolio, ses réseaux sociaux et sa communication professionnelle
          après sa diffusion publique.
        </p>
      </section>
      <section>
        <h2>11. Responsabilité</h2>
        <p>
          FERD FILMS répond de l’exécution des prestations prévues au devis dans
          la limite des obligations qui lui incombent. Le prestataire ne peut
          être tenu responsable des exploitations réalisées par le client en
          dehors des droits obtenus ni des éléments fournis sans autorisation
          suffisante.
        </p>
      </section>
      <section>
        <h2>12. Clients consommateurs</h2>
        <p>
          Lorsqu’un droit de rétractation s’applique à un contrat conclu à
          distance, le client consommateur dispose du délai légal applicable. Si
          l’exécution doit commencer avant son expiration, son accord exprès est
          recueilli.
        </p>
      </section>
      <section>
        <h2>13. Données personnelles</h2>
        <p>
          Les informations transmises servent uniquement à répondre aux
          demandes, préparer les devis et gérer la relation contractuelle. Les
          modalités détaillées d’exercice des droits seront précisées dans la
          politique de confidentialité du site.
        </p>
      </section>
      <section>
        <h2>14. Droit applicable et litiges</h2>
        <p>
          Les parties privilégient une résolution amiable de tout différend. Les
          présentes conditions sont soumises au droit français, sans priver un
          client consommateur des protections impératives dont il bénéficie.
        </p>
      </section>

      <footer>
        <ActionLink variant="primary" to="/#contact">
          Parler de mon clip
        </ActionLink>
      </footer>
    </FilmsPageContent>
    <FilmsFooter />
  </main>
);

export default TermsPage;
