import { Child } from "../types/models";
import { CheckInForm } from "./CheckInForm";
import { CheckOutForm } from "./CheckOutForm";

type Props = {
  children: Child[];
};

export function Table(props: Props) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Checked in</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.children.map((child) => (
            <tr key={child.childId} style={{ textAlign: "center" }}>
              {/* Name */}
              <td>{child.name.fullName}</td>
              {/* Checked in status */}
              <td>{child.checkedIn ? "✅" : "❌"}</td>
              {/* Actions */}
              <td>
                {child.checkedIn ? (
                  <CheckOutForm childId={child.childId} />
                ) : (
                  <CheckInForm childId={child.childId} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
