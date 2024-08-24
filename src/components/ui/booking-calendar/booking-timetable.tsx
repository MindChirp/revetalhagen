interface BookingTimetableProps extends React.HTMLProps<HTMLDivElement> {
  selectedDate?: Date;
}
export default function BookingTimetable({
  selectedDate,
  ...props
}: BookingTimetableProps) {
  return (
    <div className="w-full h-fit">
      {new Array(24).fill(0).map((_, i) => (
        <div
          key={i}
          className="w-full h-12 border-b border-border border-solid flex items-center justify-center"
        >
          {i}:00
        </div>
      ))}
    </div>
  );
}
