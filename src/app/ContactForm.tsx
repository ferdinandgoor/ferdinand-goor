import {
  FormEvent,
  HTMLInputTypeAttribute,
  ReactNode,
  useRef,
  useState,
} from "react";
import emailjs from "@emailjs/browser";

interface FieldSetProps {
  legend: string;
  children: ReactNode;
}

const FieldSet = ({ legend, children }: FieldSetProps) => (
  <fieldset
    style={{
      color: "#00ff0d",
      border: "solid 1px",
      padding: "20px",
      marginBottom: "40px",
    }}
  >
    <legend>{legend}</legend>
    {children}
  </fieldset>
);

interface FieldProps {
  label: string;
  children: ReactNode;
  id: string;
}

const Field = ({ label, children, id }: FieldProps) => (
  <div
    style={{
      border: "solid 1px #00ff0d",
      display: "flex",
    }}
  >
    <label
      htmlFor={id}
      style={{
        borderRight: "solid 1px #00ff0d",
        padding: "10px 20px",
        width: "30%",
        fontSize: "12px",
      }}
    >
      {label}
    </label>
    {children}
  </div>
);

interface InputProps {
  label: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (newValue: string) => void;
  id: string;
}

const Input = ({ id, label, type, value, onChange }: InputProps) => (
  <Field label={label} id={id}>
    <input
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      id={id}
      style={{
        flexGrow: 1,
        background: "none",
        border: "none",
        outline: "none",
        color: "#00ff0d",
        padding: "0 20px",
      }}
    />
  </Field>
);

interface ToggleProps {
  label: string;
  isChecked: boolean;
  onClick: () => void;
  id: string;
}

const Toggle = ({ label, isChecked, onClick, id }: ToggleProps) => (
  <Field label={label} id={id}>
    <input
      style={{
        display: "none",
      }}
      id={id}
      type="checkbox"
      name="scales"
      checked={isChecked}
      onClick={onClick}
    />
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        width: "70%",
      }}
    >
      <label
        htmlFor={id}
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          cursor: "pointer",
          backgroundColor: isChecked ? "#00ff0d" : "black",
          color: isChecked ? "black" : "#00ff0d",
        }}
      >
        Yes
      </label>
      <label
        htmlFor={id}
        style={{
          padding: "4px 8px",
          fontSize: "12px",
          cursor: "pointer",
          backgroundColor: isChecked ? "black" : "#00ff0d",
          color: isChecked ? "#00ff0d" : "black",
        }}
      >
        No
      </label>
    </div>
  </Field>
);

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState(3);
  const [feedbackSeries, setFeedbackSeries] = useState(3);
  const [request, setRequest] = useState("");
  const [withWriting, setWithWriting] = useState(false);
  const [withShortVideos, setWithShortVideos] = useState(false);
  const [withTeaser, setWithTeaser] = useState(false);
  const [withCGIs, setWithCGIs] = useState(false);

  const getPricing = () => {
    let priceByDuration = 0;
    if (duration <= 3) {
      priceByDuration = 200;
    } else {
      priceByDuration = 200 + (duration - 3) * 100;
    }

    let optionsPrice = 0;
    if (withWriting) optionsPrice += 100;
    if (withShortVideos) optionsPrice += 100;
    if (withTeaser) optionsPrice += 50;
    if (withCGIs) optionsPrice += 200;

    const priceByFeedback = feedbackSeries <= 1 ? 100 : feedbackSeries * 100;

    const pricing = {
      duration,
      priceByDuration,
      feedbackSeries,
      priceByFeedback,
      withWriting,
      priceWithWriting: withWriting ? 100 : 0,
      withShortVideos,
      priceWithShortVideos: withShortVideos ? 100 : 0,
      withTeaser,
      priceWithTeaser: withTeaser ? 50 : 0,
      withCGIs,
      priceWithCGIs: withCGIs ? 200 : 0,
    };

    return {
      ...pricing,
      request,
      totalPrice:
        priceByDuration +
        priceByFeedback +
        pricing.priceWithWriting +
        pricing.priceWithShortVideos +
        pricing.priceWithTeaser +
        pricing.priceWithCGIs,
    };
  };

  const pricingDetails = getPricing();

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .send(
        "service_28iexb2",
        "template_8quxtii",
        {
          name,
          email,
          ...pricingDetails,
        },
        {
          publicKey: "QRqHcTUCJJwm2raxT",
        }
      )
      .then(
        (response) => {
          alert("Email Send!");
          console.log("Email Send!", response.status, response.text);
        },
        (error) => {
          console.log("An Error occured", error.text);
        }
      );
  };

  return (
    <form
      style={{
        padding: "40px",
      }}
      onSubmit={sendEmail}
    >
      <div
        style={{
          border: "solid 1px #00ff0d",
          padding: "40px",
        }}
      >
        <FieldSet legend="Personal Information">
          <Input
            id="name"
            label="name"
            type="text"
            value={name}
            onChange={setName}
          />
          <Input
            id="email"
            label="email"
            type="email"
            value={email}
            onChange={setEmail}
          />
        </FieldSet>
        <FieldSet legend="Options">
          <Input
            id="duration"
            label="song duration (in minutes)"
            type="number"
            value={duration.toString()}
            onChange={(newValue) => setDuration(parseInt(newValue, 10))}
          />
          <Input
            id="number"
            label="number of feedback series"
            type="number"
            value={feedbackSeries.toString()}
            onChange={(newValue) => setFeedbackSeries(parseInt(newValue, 10))}
          />
          <Toggle
            id="writing"
            label="writing"
            isChecked={withWriting}
            onClick={() => setWithWriting(!withWriting)}
          />
          <Toggle
            id="short-video"
            label="short video"
            isChecked={withShortVideos}
            onClick={() => setWithShortVideos(!withShortVideos)}
          />
          <Toggle
            id="teaser"
            label="teaser"
            isChecked={withTeaser}
            onClick={() => setWithTeaser(!withTeaser)}
          />
          <Toggle
            id="cgis"
            label="CGIs"
            isChecked={withCGIs}
            onClick={() => setWithCGIs(!withCGIs)}
          />
        </FieldSet>
        <FieldSet legend="Special Request">
          <textarea
            id="request"
            name="w3review"
            rows={4}
            cols={50}
            onChange={(event) => setRequest(event?.target.value)}
            style={{
              width: "100%",
              background: "none",
              border: "solid 1px #00ff0d",
              color: "#00ff0d",
              outline: "none",
              padding: "10px",
            }}
          >
            {request}
          </textarea>
        </FieldSet>

        <p
          style={{
            color: "#00ff0d",
          }}
        >
          Price Estimation : {pricingDetails.totalPrice}€
        </p>

        <button
          style={{
            color: "black",
            backgroundColor: "#00ff0d",
            border: "none",
            outline: "none",
            padding: "20px",
            fontSize: "20px",
            fontFamily: "inherit",
            cursor: "pointer",
          }}
          type="submit"
          value="request"
        >
          Send Request
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
