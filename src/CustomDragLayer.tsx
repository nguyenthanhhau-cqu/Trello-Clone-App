import { useDragLayer } from "react-dnd"; //provide info of dragged item
import { Column } from "./Column"; // our dragged item
import { CustomDragLayerContainer, DragPreviewWrapper } from "./styles"; // dragging layer, will render dragging preview inside of it
import { useAppState } from "./state/AppStateContext"; // to get draggedItem from it
import { Card } from "./Card";

export const CustomDragLayer = () => {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    //the currentOffset will give a coordinator x,y following the mouse cursor of the dragged item
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column id={draggedItem.id} text={draggedItem.text} isPreview />
        ) : (
          <Card
            columnId={draggedItem.columnId}
            isPreview
            id={draggedItem.id}
            text={draggedItem.text}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
};
